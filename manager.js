import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ButtonBuilder,
    ButtonStyle
} from 'discord.js';

/* ======================================================
   MANAGER
====================================================== */

export async function manager(client) {
    const basePath = path.join(process.cwd(), 'Bot');
    const HelpRegistry = [];

    let loaded = 0;
    let failed = 0;

    async function walk(dir) {
        const entries = await fs.promises.readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                await walk(fullPath);
                continue;
            }

            if (!entry.name.endsWith('.js')) continue;

            try {
                const module = await import(pathToFileURL(fullPath).href);

                for (const key of Object.keys(module)) {
                    if (
                        typeof module[key] === 'function' &&
                        module[key][Symbol.toStringTag] === 'AsyncFunction'
                    ) {
                        const helpObj = await module[key](client);
                        if (helpObj?.name && helpObj?.info) {
                            HelpRegistry.push({
                                name: helpObj.name,
                                info: helpObj.info
                            });
                        }
                    }
                }

                loaded++;
            } catch (err) {
                failed++;
                console.error(`[MANAGER] Failed to load file: ${fullPath}`);
                console.error(err);
            }
        }
    }

    await walk(basePath);

    console.log(`[MANAGER] Loaded ${loaded} files`);
    if (failed > 0)
        console.log(`[MANAGER] Unable to load ${failed} files. See errors above.`);

    // !help listener
    client.on('messageCreate', async message => {
        if (message.content !== '!help') return;

        if (!HelpRegistry.length) {
            await message.channel.send('No commands active.');
            return;
        }

        const options = HelpRegistry.slice(0, 25).map((item, index) => {
            const name = item.name.replace(/^!/, '');
            const capitalized =
                name.charAt(0).toUpperCase() + name.slice(1);

            return {
                label: `Command ${index + 1}: ${capitalized}`,
                value: String(index)
            };
        });

        const selectRow = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('help_select')
                .setPlaceholder('Select a command')
                .addOptions(options)
        );

        await message.channel.send({
            content: 'Here is a list of commands! Feel free to choose one.',
            components: [selectRow]
        });
    });

    // Ephemeral command info + pagination buttons
    client.on('interactionCreate', async interaction => {
        if (!interaction.isStringSelectMenu()) return;
        if (!interaction.customId.startsWith('help_select')) return;

        const index = parseInt(interaction.values[0]);
        if (isNaN(index) || !HelpRegistry[index]) return;

        let currentIndex = index;

        const buildButtonRow = idx =>
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('prev_command')
                    .setLabel('◀ Previous')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(idx === 0),

                new ButtonBuilder()
                    .setCustomId('next_command')
                    .setLabel('Next ▶')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(idx === HelpRegistry.length - 1)
            );

        await interaction.reply({
            content: HelpRegistry[currentIndex].info,
            components: [buildButtonRow(currentIndex)],
            ephemeral: true
        });

        const collector =
            interaction.channel.createMessageComponentCollector({
                time: 120000
            });

        collector.on('collect', async btnInteraction => {
            if (btnInteraction.user.id !== interaction.user.id) {
                return btnInteraction.reply({
                    content: 'Not your help menu.',
                    ephemeral: true
                });
            }

            if (btnInteraction.customId === 'prev_command') {
                currentIndex = Math.max(0, currentIndex - 1);
            } else if (btnInteraction.customId === 'next_command') {
                currentIndex = Math.min(
                    HelpRegistry.length - 1,
                    currentIndex + 1
                );
            }

            await btnInteraction.update({
                content: HelpRegistry[currentIndex].info,
                components: [buildButtonRow(currentIndex)]
            });
        });
    });
}