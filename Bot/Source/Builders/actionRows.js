import { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } from "discord.js";

export const verificationButton = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setLabel('Verify')
            .setCustomId('verify-button')
            .setStyle(ButtonStyle.Primary)
    )

export const dashboardRow = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('dashboard-select')
            .setPlaceholder('Navigate Our Dashboard')
            .addOptions(
                {
                    label: 'Regulations', 
                    description: 'Open the regulations page', 
                    value: 'reg', 
                    emoji: '1520162337116389446'
                },
                {
                    label: 'Assistance', 
                    description: 'Open the support panel.', 
                    value: 'assistance', 
                    emoji: '1523405804643025169'
                }, 
                {
                    label: 'Shop', 
                    description: 'View the shop items', 
                    value: 'shop', 
                    emoji: '1520162337116389446'
                }, 
                {
                    label: 'Careers', 
                    description: 'Apply for a position at Florida State Roleplay.', 
                    value: 'careers', 
                    emoji: '1522322359821008896'
                }
            )
    )

export const supportRow1 = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('support-type')
            .setPlaceholder('Choose a support category!')
            .addOptions(
                {
                    label: 'General',
                    description: 'Open a General Support ticket.',
                    value: 'general'
                },
                {
                    label: 'Community',
                    description: 'Open a Community Support ticket.',
                    value: 'community'
                },
                {
                    label: 'Departmental',
                    description: 'Open a Departmental Support ticket.',
                    value: 'departmental'
                },
                {
                    label: 'Internal Affairs',
                    description: 'Open an Internal Affairs ticket.',
                    value: 'internal_affairs'
                },
                {
                    label: 'Management',
                    description: 'Open a Management ticket.',
                    value: 'management'
                }
            )
    )

export function generateSupportRow2(ticket) {
    return new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Claim Ticket')
                .setCustomId('claim-ticket')
                .setStyle(ButtonStyle.Success)
                .setDisabled(ticket?.claimedBy !== null), 
            new ButtonBuilder()
                .setLabel('Unclaim Ticket')
                .setCustomId('unclaim-ticket')
                .setStyle(ButtonStyle.Danger)
                .setDisabled(ticket?.claimedBy === null), 
            new ButtonBuilder()
                .setLabel('Close Ticket')
                .setCustomId('close-ticket')
                .setStyle(ButtonStyle.Secondary)
        )
}