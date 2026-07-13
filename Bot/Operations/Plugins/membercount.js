export async function memberCount(client) {
    client.on("messageCreate", async (message) => {
        if (message.author.bot || !message.guild) return;

        if (message.content.toLowerCase() !== "!membercount") return;

        await message.guild.members.fetch();

        const total = message.guild.memberCount;
        const humans = message.guild.members.cache.filter(m => !m.user.bot).size;
        const bots = message.guild.members.cache.filter(m => m.user.bot).size;

        message.reply(
            `**Member Count**\n` +
            `Total: **${total}**\n` +
            `Humans: **${humans}**\n` +
            `Bots: **${bots}**`
        );
    });
}