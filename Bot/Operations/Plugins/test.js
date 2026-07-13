export async function test(client) {
    client.on('messageCreate', async (m) => {
        if(m.content === '?gitCommit') {
            await m.reply('Commit — 1')
        }
    })
}