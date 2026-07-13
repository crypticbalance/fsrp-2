import fs from "fs";
import path from "path";

function getFiles(dir) {
    let files = [];

    for (const file of fs.readdirSync(dir)) {
        if (file === "node_modules" || file === ".git") continue;

        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            files.push(...getFiles(fullPath));
        } else {
            files.push(fullPath);
        }
    }

    return files;
}

function countLines(file) {
    return fs.readFileSync(file, "utf8").split("\n").length;
}

export async function lines(client) {
    client.on("messageCreate", async (message) => {
        if (message.author.bot) return;
        if (message.content !== "!lines") return;

        const files = getFiles("./");

        let total = 0;
        let output = [];

        for (const file of files) {
            try {
                const lineCount = countLines(file);

                total += lineCount;

                output.push({
                    file,
                    lines: lineCount
                });
            } catch {
                output.push({
                    file,
                    lines: 0
                });
            }
        }

        output.sort((a, b) => b.lines - a.lines);

        const fileOutput = output
            .map(file => `${file.file}: ${file.lines} lines`)
            .join("\n+ ");

        await message.reply(
            `\`\`\`diff\n+ ${fileOutput}\n\`\`\`\n` +
            `\`\`\`ansi\n\u001b[1;36mTotal Lines: ${total}\u001b[0m\n\`\`\``
        );
    });
}