import { getDiscordFromRobloxId } from "../../Source/Databases/initDb.js";

export async function vcCheck(client) {
    setInterval(async () => {
        if (!client.isReady()) {
            return;
        }

        try {
            const options = {
                method: "GET",
                headers: {
                    "server-key": 'vaUXDJQaGeegaeDGEeaR-SZEgxsDzMNGbxDyrdwADHSOIFfIUPiLHilIbncAc'
                }
            };

            const res = await fetch(
                "https://api.erlc.gg/v2/server?Players=true",
                options
            );

            if (!res.ok) {
                console.error(`[VC CHECK] Failed to fetch players: ${res.status}`);
                return;
            }

            const data = await res.json();

            if (!Array.isArray(data.Players)) {
                return;
            }

            const guild = await client.guilds.fetch("1517636727781462258");

            for (const player of data.Players) {
                const username = player.Player.split(":")[0];
                const robloxId = player.Player.split(":")[1];

                const user = getDiscordFromRobloxId(robloxId);

                if (!user?.discordId) {
                    const commandOptions = {
                        method: "POST",
                        headers: {
                            "server-key": process.env.erlcToken,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            command: `:kick ${username}`
                        })
                    };

                    const commandRes = await fetch(
                        "https://api.erlc.gg/v2/server/command",
                        commandOptions
                    );

                    if (!commandRes.ok) {
                        console.error(`[COMMAND] Failed to kick ${username}`);
                    }

                    continue;
                }

                const member = await guild.members.fetch(user.discordId).catch(() => null);

                if (!member) {
                    const commandOptions = {
                        method: "POST",
                        headers: {
                            "server-key": process.env.erlcToken,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            command: `:pm ${username} Please join the Discord server.`
                        })
                    };

                    await fetch(
                        "https://api.erlc.gg/v2/server/command",
                        commandOptions
                    );

                    continue;
                }

                if (!member.voice.channel) {
                    const commandOptions = {
                        method: "POST",
                        headers: {
                            "server-key": process.env.erlcToken,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            command: `:pm ${username} Please join a voice channel.`
                        })
                    };

                    const commandRes = await fetch(
                        "https://api.erlc.gg/v2/server/command",
                        commandOptions
                    );

                    if (!commandRes.ok) {
                        console.error(`[COMMAND] Failed to PM ${username}`);
                    }
                }
            }
        } catch (err) {
            console.error("[VC CHECK] Fatal error:", err);
        }
    }, 5 * 60 * 1000);
}