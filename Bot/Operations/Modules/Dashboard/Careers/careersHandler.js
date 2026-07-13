export async function careersHandler(client) {
    client.on('interactionCreate', async (i) => {
        if(i.isStringSelectMenu()) {
            if(i.customId === 'dashboard-select') {
                if(i.values[0] === 'careers') {
                    return await i.reply({
                        content: 'At this time, the careers panel is under construction. Please check back later for updates.', 
                        flags: 1 << 6
                    });
                }
            }
        }
    });
}