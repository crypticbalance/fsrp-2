import { PermissionsBitField } from "discord.js";

export async function roleCommand(client) {
    client.on("messageCreate", async (message) => {
        if (message.author.bot || !message.guild) return;

        const args = message.content.trim().split(/ +/);

        if (args[0].toLowerCase() !== "!role") return;

        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return message.reply("❌ You don't have permission to use this command.");
        }

        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return message.reply("❌ I don't have permission to manage roles.");
        }

        if (args.length < 3) {
            return message.reply("Usage: `!role <@member|member id|e> <role name|role id|@role>`");
        }

        const target = args[1];
        const roleInput = args.slice(2).join(" ");

        const role =
            message.guild.roles.cache.get(roleInput.replace(/[<@&>]/g, "")) ||
            message.guild.roles.cache.find(
                r => r.name.toLowerCase() === roleInput.toLowerCase()
            );

        if (!role) {
            return message.reply("❌ Role not found.");
        }

        if (role.position >= message.guild.members.me.roles.highest.position) {
            return message.reply("❌ That role is higher than or equal to my highest role.");
        }

        if (target.toLowerCase() === "e") {
            await message.reply(`⏳ Adding **${role.name}** to everyone...`);

            let success = 0;
            let failed = 0;

            await message.guild.members.fetch();

            for (const member of message.guild.members.cache.values()) {
                if (member.user.bot) continue;
                if (member.roles.cache.has(role.id)) continue;

                try {
                    await member.roles.add(role);
                    success++;
                } catch {
                    failed++;
                }
            }

            return message.channel.send(
                `✅ Finished!\nAdded **${role.name}** to **${success}** members.\nFailed: **${failed}**.`
            );
        }

        const member =
            message.mentions.members.first() ||
            await message.guild.members.fetch(target).catch(() => null);

        if (!member) {
            return message.reply("❌ Member not found.");
        }

        if (member.roles.cache.has(role.id)) {
            return message.reply("❌ That member already has that role.");
        }

        try {
            await member.roles.add(role);
            return message.reply(`✅ Added **${role.name}** to ${member.user.tag}.`);
        } catch (err) {
            console.error(err);
            return message.reply("❌ Failed to add the role.");
        }
    });
}