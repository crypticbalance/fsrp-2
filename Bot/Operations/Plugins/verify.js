import { addUser, getVerificationByDiscord, removeVerification } from "../../Source/Databases/initDb.js";

export async function verify(client) {
    client.on('interactionCreate', async (i) => {
        if(i.customId === 'verify-button') {
            if(getVerificationByDiscord(i.user.id)) {
                removeVerification(i.user.id)
                return await i.reply({
                    content: `<:yes:1520162365558099979> **${i.user.username}**, You have been unverified.`, 
                    flags: 1 << 6
                })
            }

            const res = await fetch(`https://api.blox.link/v4/public/guilds/1517636727781462258/discord-to-roblox/${i.user.id}`, { 
                    headers: { 
                        "Authorization": process.env.bloxlinkToken
                    } 
                }
            )
            const data = await res.json();

            const robloxRes = await fetch(`https://users.roblox.com/v1/users/${data.robloxID}`);
            const robloxData = await robloxRes.json();

            await i.reply({
                content: `<:yes:1520162365558099979> Thank you, **${i.user.username}**. You have verified as **${robloxData.name}** (*${robloxData.displayName}*). Your Discord Id (*${i.user.id}*) has been linked to your Roblox Id (*${data.robloxID}*)`, 
                flags: 1 << 6
            })

            await addUser(i.user.id, data.robloxID);
        }
    })
}