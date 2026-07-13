import { shopContainer } from "../../../Source/Builders/container.js"

export async function regulations(client) {
    client.on('interactionCreate', async (i) => {
        if(i.isStringSelectMenu()) {
            if(i.customId === 'dashboard-select') {
                if(i.values[0] === 'shop') {
                    await i.reply({
                        components: [shopContainer],
                        flags: 1 << 6 | 1 << 15
                    })
                }
            }
        }
    })
}