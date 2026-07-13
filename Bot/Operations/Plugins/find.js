import fs from "fs/promises";
import path from "path";

export async function find(client) {
    client.on("messageCreate", async (message) => {
        if (message.author.bot) return;
        if (!message.content.startsWith("!find")) return;

        const query = message.content
            .slice("!find".length)
            .trim()
            .toLowerCase();

        if (!query) {
            return message.reply("Usage: `!find <string>`");
        }

        const root = "./Bot";
        const results = [];

        async function walk(dir) {
            let entries;

            try {
                entries = await fs.readdir(dir, { withFileTypes: true });
            } catch {
                return;
            }

            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);

                if (entry.isDirectory()) {
                    await walk(fullPath);
                    continue;
                }

                if (!entry.name.endsWith(".js")) continue;

                let content;

                try {
                    content = await fs.readFile(fullPath, "utf8");
                } catch {
                    continue;
                }

                const lines = content.split("\n");

                lines.forEach((line, index) => {
                    if (line.toLowerCase().includes(query)) {
                        results.push({
                            file: fullPath,
                            line: index + 1,
                            content: line.trim()
                        });
                    }
                });
            }
        }

        await walk(root);

        if (!results.length) {
            return message.reply(`No matches found for \`${query}\`.`);
        }

        const output = results
            .slice(0, 25)
            .map((result, index) => {
                return [
                    `**${index + 1}. ${result.file}**`,
                    `> Line **${result.line}**: \`${result.content.slice(0, 150)}\``
                ].join("\n");
            })
            .join("\n\n");

        await message.reply({
            content: `🔎 Found **${results.length}** match(es) for \`${query}\`:\n\n${output}`
        });
    });
};