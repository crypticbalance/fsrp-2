import { CommandInteractionOptionResolver } from "discord.js";
import { generateSupportContainer, generateSupportMessage, generateSupportCloseDm, generateSupportLogContainer } from "../../../../Source/Builders/container.js";
import { generateTicketModal } from "../../../../Source/Builders/Modals/modal.js";
import { getAllTickets, openTicket, getTicket, closeTicket, claimTicket, unclaimTicket } from "../../../../Source/Databases/initDb.js";
import { wait } from "../../../../Source/Functions/wait.js";

export async function supportHandler(client) {
    client.on('interactionCreate', async (i) => {
        if(i.isStringSelectMenu()) {
            if(i.customId === 'dashboard-select') {
                if(i.values[0] === 'assistance') {
                    await i.reply({
                        content: 'Please wait while I generate your support panel.', 
                        flags: 1 << 6
                    });

                    await wait(1.5);

                    const container = await generateSupportContainer(i.user);

                    if(container === 'unverified') {
                        return await i.editReply({
                            content: `<:no:1520162372273180812> **${i.user.username}**, you must verify your account before opening a support ticket. Please navigate to the **dashboard** (<#1520161636902764628>) channel to complete the verification process.`,
                            flags: 1 << 6
                        })
                    }

                    await i.editReply({
                        content: null,
                        components: [container], 
                        flags: 1 << 6 | 1 << 15
                    })
                }
            } else if(i.customId === 'support-type') {
                await i.showModal(generateTicketModal(i.values[0]));
            }
        } else if(i.isModalSubmit()) {
            if(i.customId.startsWith('ticketsModal-')) {
                const inquiry = i.fields.getTextInputValue('ticketInput');
                const type = i.customId.split('-')[1];

                if(type === 'departmental') {
                    return await i.reply({
                        content: `<:no:1520162372273180812> **${i.user.username}**, for departmental issues needing support, please navigate to the Department Hub Discord or the corresponding department. Thank you!`, 
                        flags: 1 << 6
                    })
                } else if(type === 'management') {
                    return await i.reply({
                        content: `<:no:1520162372273180812> **${i.user.username}**, tickets cannot be directly opened to the management team. We suggest choosing an option such as \`Internal Affairs\` to get your ticket quickly handled or escalated.\n \`\`\`ansi\n[31mYou must provide context before our team escalates your ticket.[0m\`\`\``, 
                        flags: 1 << 6
                    })
                }

                const channel = await i.guild.channels.create({
                    name: `${type}-${getAllTickets().length + 1}`, 
                    parent: '1523833604038328381'
                })

                const ticket = openTicket(i.user.id, type, inquiry, channel.id);

                await channel.send({
                    components: [await generateSupportMessage(i.user, type, inquiry, getTicket(channel.id))],
                    flags: 1 << 15
                });

                return await i.reply({
                    content: `<:yes:1520162365558099979> **${i.user.username}**, your ticket has been successfully opened. Please check <#${channel.id}>.`, 
                    flags: 1 << 6
                })
            }
        } else if(i.isButton()) {
            if(i.customId === 'close-ticket') {
                async function closeTicketOrgan(i) {
                    const channel = i.channel;

                    const ticket = getTicket(channel.id);

                    if(!ticket) {
                        return await i.reply({
                            content: `<:no:1520162372273180812> **${i.user.username}**, this ticket does not exist in the database. Please contact a staff member to resolve this issue.`, 
                            flags: 1 << 6
                        })
                    };

                    const response = await fetch(
                        `https://api.cookie-api.com/api/transcript?channel_id=${channel.id}`,
                        {
                            method: "POST",
                            headers: {
                                Authorization: 'sk_live_37LQT5GBy1b7GZqoUXhsPJk1N30XaakxsQNbGd1zVx7dS4zKo78PU4i5FBMSbj99',
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                bot_token: 'MTUyMDE0NjQzOTM1Nzk4ODk2NA.Gz0CGF.W99NNMwfengHknBv1EslM47ISkuTf23zbcMVB8',
                                title: `Ticket #${ticket.id} Transcript`,
                                description: `Transcript for ${i.user.tag}`
                            })
                        }
                    );

                    const data = await response.json();

                    await closeTicket(channel.id, i.user.id, channel.messages.cache.size, data.url);

                    const user = await client.users.fetch(ticket.openedBy);

                    console.log(getTicket(channel.id));

                    await user.send({
                        components: [await generateSupportCloseDm(user, ticket.inquiry, ticket.type, getTicket(channel.id))],
                        flags: 1 << 15
                    });

                    await channel.delete();

                    const logChannel = await i.guild.channels.fetch('1520162111043539145');

                    await logChannel.send({
                        components: [await generateSupportLogContainer(getTicket(channel.id), channel)],
                        flags: 1 << 15
                    })
                }

                await closeTicketOrgan(i);
            } else if(i.customId === 'claim-ticket') {
                const channel = i.channel;

                const ticket = getTicket(channel.id);

                if(!ticket) {
                    return await i.reply({
                        content: `<:no:1520162372273180812> **${i.user.username}**, this ticket does not exist in the database. Please contact a staff member to resolve this issue.`, 
                        flags: 1 << 6
                    })
                };

                if(ticket.claimedBy && ticket.claimedBy !== i.user.id) {
                    return await i.reply({
                        content: `<:no:1520162372273180812> **${i.user.username}**, this ticket has already been claimed by another staff member.`, 
                        flags: 1 << 6
                    })
                }

                claimTicket(channel.id, i.user.id);

                await i.reply({
                    content: `<:yes:1520162365558099979> **${i.user.username}**, you have successfully claimed this ticket.`, 
                    flags: 1 << 6
                })

                await i.channel.send({
                    content: `<@${await getTicket(channel.id)?.openedBy}> **${i.user.username}** has claimed this ticket. Please wait while they assist you.`,
                    flags: 1 << 6
                })

                await i.message.edit({
                    components: [await generateSupportMessage(i.user, ticket.type, ticket.inquiry, getTicket(channel.id))],
                    flags: 1 << 15
                })
            } else if(i.customId === 'unclaim-ticket') {
                const channel = i.channel;

                const ticket = getTicket(channel.id);

                if(!ticket) {
                    return await i.reply({
                        content: `<:no:1520162372273180812> **${i.user.username}**, this ticket does not exist in the database. Please contact a staff member to resolve this issue.`, 
                        flags: 1 << 6
                    })
                };

                if(ticket.claimedBy !== i.user.id) {
                    return await i.reply({
                        content: `<:no:1520162372273180812> **${i.user.username}**, you cannot unclaim this ticket as you are not the staff member who claimed it.`, 
                        flags: 1 << 6
                    })
                }

                unclaimTicket(channel.id);

                await i.message.edit({
                    components: [await generateSupportMessage(i.user, ticket.type, ticket.inquiry, getTicket(channel.id))],
                    flags: 1 << 15
                })

                await i.reply({
                    content: `<:yes:1520162365558099979> **${i.user.username}**, you have successfully unclaimed this ticket.`, 
                    flags: 1 << 6
                })
            }
        }
    });
}