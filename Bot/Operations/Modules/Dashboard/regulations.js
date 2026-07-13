import { discordRegulationsContainer, gameRulesContainer } from "../../../Source/Builders/container.js"

export async function regulations(client) {
    client.on('interactionCreate', async (i) => {
        if(i.isStringSelectMenu()) {
            if(i.customId === 'dashboard-select') {
                if(i.values[0] === 'reg') {
                    await i.reply({
                        components: [discordRegulationsContainer, gameRulesContainer], 
                        flags: 1 << 6 | 1 << 15
                    })
                }
            }
        }
    })
}