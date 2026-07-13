import sharp from "sharp";

export async function emoji(client) {
    client.on("messageCreate", async (message) => {
        if (message.author.bot) return;
        if (!message.content.startsWith("!emoji")) return;

        const args = message.content.split(/\s+/);
        const name = args[1];

        if (!name) {
            return message.reply(
                "Usage: !emoji <name> (attach image or use emoji)"
            );
        }

        const attachment = message.attachments.first();

        try {
            let buffer;

            const processImage = async (inputBuffer) => {
                const metadata = await sharp(inputBuffer).metadata();

                // Make image fill the entire emoji space while keeping aspect ratio.
                const size = Math.max(
                    metadata.width || 128,
                    metadata.height || 128
                );

                return sharp(inputBuffer)
                    .resize(size, size, {
                        fit: "contain",
                        background: {
                            r: 0,
                            g: 0,
                            b: 0,
                            alpha: 0
                        }
                    })
                    .resize(128, 128, {
                        fit: "cover",
                        position: "centre"
                    })
                    .png()
                    .toBuffer();
            };

            // Attachment image
            if (attachment) {
                const res = await fetch(attachment.url);

                if (!res.ok) {
                    return message.reply("Failed to download image.");
                }

                const arrayBuffer = await res.arrayBuffer();
                const inputBuffer = Buffer.from(arrayBuffer);

                buffer = await processImage(inputBuffer);
            } else {
                // Custom emoji
                const rawEmoji = args[2];

                if (!rawEmoji) {
                    return message.reply(
                        "Provide a custom emoji or attach an image."
                    );
                }

                const match = rawEmoji.match(/(\d{15,20})/);

                if (!match) {
                    return message.reply("Invalid custom emoji.");
                }

                const id = match[1];
                const isAnimated = rawEmoji.startsWith("<a:");

                const url = `https://cdn.discordapp.com/emojis/${id}.${isAnimated ? "gif" : "png"}`;

                const res = await fetch(url);

                if (!res.ok) {
                    return message.reply("Failed to download emoji.");
                }

                const arrayBuffer = await res.arrayBuffer();
                const inputBuffer = Buffer.from(arrayBuffer);

                buffer = await processImage(inputBuffer);
            }

            const created = await message.guild.emojis.create({
                attachment: buffer,
                name
            });

            return message.reply(`✅ Created ${created}`);
        } catch (err) {
            console.error(err);

            return message.reply(
                "❌ Failed to create emoji (invalid image, image too large, or missing permissions)."
            );
        }
    });
}