export async function erlcCommand(client) {
    client.on('messageCreate', async (m) => {
        if(m.content.startsWith('?erlc')) {
            if(!m.member.roles.cache.has('1520161279593943182')) {
                return await m.reply(`<:no:1520162372273180812> **${m.author.username}**, you must be apart of the staff team to run this command.`)
            } else {
                const options = {
                    method: 'POST',
                    headers: {
                        'server-key': process.env.erlcToken,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({command: `${m.content.replace('!erlc ', '')}`})
                };

                const res = await fetch('https://api.erlc.gg/v2/server/command', options);

                if(!res.ok) {
                    return await m.reply(`<:no:1520162372273180812> **${m.author.username}**, I was unable to run this command.`)
                }

                await m.reply(`<:yes:1520162365558099979> **${m.author.username}**, I have successfully ran your command!`)
            }
        }
    })
}