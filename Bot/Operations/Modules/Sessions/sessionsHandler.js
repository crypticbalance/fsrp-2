import { hostSession } from "../../../Source/Databases/initDb.js";

export async function sessionsHandler(client) {
    client.on('messageCreate', async (m) => {
        if(m.content.startsWith('?sessions')) {
            const requiredVotes = m.content.split(' ')[1];

            if(!requiredVotes || isNaN(requiredVotes)) {
                return await m.reply({
                    content: `<:no:1520162372273180812> **${m.author.username}**, please provide a valid number of required votes for the session. Usage: \`?sessions <requiredVotes>\``,
                    flags: 1 << 6
                });
            }

            // hostSession(message.id, user, requiredVotes)
        }
    });
}