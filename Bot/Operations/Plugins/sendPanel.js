import { channelLink } from "discord.js";
import { dashboardContainer, verificationContainer } from "../../Source/Builders/container.js";

export async function sendPanel(client) {
    const channel = await client.channels.fetch('1522323388872261632');

    await channel.send({
        components: [verificationContainer, dashboardContainer], 
        flags: 1 << 15
    });
}