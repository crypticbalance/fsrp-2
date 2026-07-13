import { ContainerBuilder, MediaGalleryBuilder, MediaGalleryItemBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder } from "discord.js";
import { dashboardRow, supportRow1, verificationButton, generateSupportRow2 } from "./actionRows.js";
import { getVerificationByDiscord, getTicket } from "../Databases/initDb.js";
import { getRobloxUsername } from "../Functions/getRobloxUsername.js";

export const verificationContainer = new ContainerBuilder()
    .setAccentColor(0x00C9FF)
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('# <:Florida:1522322359821008896> | Verification')
    )
    .addSeparatorComponents(
        new SeparatorBuilder()
            .setDivider(true)
            .setSpacing(SeparatorSpacingSize.Large)
    )
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('Welcome to **Florida State Roleplay**!\n ** **\nIn order to automate processes like moderation, shop purchases, and more, we require you to verify and connect your Roblox and Discord accounts.\nYour information is stored in an `better-sqlite3` file locally. We use `BloxLink`\'s API service to connect the accounts.\n** **\n> Please verify with the button below.')
    )
    .addSeparatorComponents(
        new SeparatorBuilder()
            .setDivider(true)
            .setSpacing(SeparatorSpacingSize.Large)
    )
    .addActionRowComponents(verificationButton)
    .addMediaGalleryComponents(
        new MediaGalleryBuilder()
            .addItems(
                new MediaGalleryItemBuilder()
                    .setURL('https://i.imgur.com/wUsEP2v.png')
            )
    )

export const dashboardContainer = new ContainerBuilder()
    .setAccentColor(0x00C9FF)
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('# <:Florida:1522322359821008896> | Florida State Roleplay')
    )
    .addSeparatorComponents(
        new SeparatorBuilder()
            .setDivider(true)
            .setSpacing(SeparatorSpacingSize.Large)
    )
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('Welcome to **Florida State Roleplay**!\n ** **\nOur dashboard provides a multitude of options; including support, our regulations, shop purchases and more.\n** **\nGet started with the options below!')
    )
    .addActionRowComponents(dashboardRow)

    
export const shopContainer = new ContainerBuilder()
    .setAccentColor(0x00C9FF)
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('# <:Florida:1522322359821008896> | Florida State Roleplay\n ** **\nWelcome to the Florida State Shop! Our items for purchase are listed below. You may click the **blue** links to be redirected to the item. We **__only__** accept Robux.')
    )

export const discordRegulationsContainer = new ContainerBuilder()
    .setAccentColor(0x00C9FF)
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('# <:Florida:1522322359821008896> | Discord Regulations')
    )
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('`1.` **Respect & Conduct**\n> Treat all members with respect. Harassment, hate speech, discrimination, or targeted toxicity is strictly prohibited.')
    )
    .addSeparatorComponents(
        new SeparatorBuilder()
            .setDivider(false)
            .setSpacing(SeparatorSpacingSize.Small)
    )
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('`2.` **Spam & Messaging**\n> No spam, mass pinging, message flooding, or disruptive behavior in any channel.')
    )
    .addSeparatorComponents(
        new SeparatorBuilder()
            .setDivider(false)
            .setSpacing(SeparatorSpacingSize.Small)
    )
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('`3.` **Content Guidelines**\n> NSFW, gore, explicit content, or inappropriate usernames, avatars, and bios are not allowed.')
    )
    .addSeparatorComponents(
        new SeparatorBuilder()
            .setDivider(false)
            .setSpacing(SeparatorSpacingSize.Small)
    )
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('`4.` **Advertising**\n> Advertising is prohibited without Executive Staff approval. This includes DMs, server invites, and external promotion.')
    )
    .addSeparatorComponents(
        new SeparatorBuilder()
            .setDivider(false)
            .setSpacing(SeparatorSpacingSize.Small)
    )
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('`5.` **Impersonation**\n> Impersonating staff, members, or official departments is strictly prohibited.')
    )
    .addSeparatorComponents(
        new SeparatorBuilder()
            .setDivider(false)
            .setSpacing(SeparatorSpacingSize.Small)
    )
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('`6.` **Channel Usage**\n> Use channels for their intended purpose. Disruption or off-topic content may be removed.')
    )
    .addSeparatorComponents(
        new SeparatorBuilder()
            .setDivider(false)
            .setSpacing(SeparatorSpacingSize.Small)
    )
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('`7.` **Staff Authority**\n> Staff decisions are final. Failure to comply with instructions may result in punishment.')
    );

export const gameRulesContainer = new ContainerBuilder()
    .setAccentColor(0x00C9FF)
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('# <:Florida:1522322359821008896> | Game Regulations')
    )
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('`1.` **Serious Roleplay**\n> All roleplay must be realistic and serious at all times. No trolling, failRP, or unrealistic behavior.')
    )
    .addSeparatorComponents(
        new SeparatorBuilder()
            .setDivider(false)
            .setSpacing(SeparatorSpacingSize.Small)
    )
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('`2.` **RDM / VDM**\n> Random Deathmatch (RDM) and Vehicle Deathmatch (VDM) are strictly prohibited.')
    )
    .addSeparatorComponents(
        new SeparatorBuilder()
            .setDivider(false)
            .setSpacing(SeparatorSpacingSize.Small)
    )
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('`3.` **New Life Rule (NLR)**\n> After death, you cannot return to the same situation or remember details from it.')
    )
    .addSeparatorComponents(
        new SeparatorBuilder()
            .setDivider(false)
            .setSpacing(SeparatorSpacingSize.Small)
    )
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('`4.` **FearRP**\n> You must value your life in all situations. Comply when realistically threatened.')
    )
    .addSeparatorComponents(
        new SeparatorBuilder()
            .setDivider(false)
            .setSpacing(SeparatorSpacingSize.Small)
    )
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('`5.` **Metagaming**\n> Using outside information (Discord, streams, etc.) in roleplay is not allowed.')
    )
    .addSeparatorComponents(
        new SeparatorBuilder()
            .setDivider(false)
            .setSpacing(SeparatorSpacingSize.Small)
    )
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('`6.` **Powergaming**\n> Forcing unrealistic actions or using mechanics to gain unfair advantages is prohibited.')
    )
    .addSeparatorComponents(
        new SeparatorBuilder()
            .setDivider(false)
            .setSpacing(SeparatorSpacingSize.Small)
    )
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('`7.` **Combat Logging**\n> Leaving the game or avoiding roleplay to escape consequences is not allowed.')
    )
    .addSeparatorComponents(
        new SeparatorBuilder()
            .setDivider(false)
            .setSpacing(SeparatorSpacingSize.Small)
    )
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('`8.` **Exploits & Glitches**\n> Exploiting bugs, glitches, or using third-party tools is strictly forbidden and may result in a permanent ban.')
    )
    .addSeparatorComponents(
        new SeparatorBuilder()
            .setDivider(false)
            .setSpacing(SeparatorSpacingSize.Small)
    )
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('`9.` **Respect Staff**\n> Staff decisions are final. Do not argue or disrupt staff enforcement in-game or in Discord.')
    )
    .addSeparatorComponents(
        new SeparatorBuilder()
            .setDivider(false)
            .setSpacing(SeparatorSpacingSize.Small)
    )
    .addTextDisplayComponents(
        new TextDisplayBuilder()
            .setContent('`10.` **General Conduct**\n> Maintain professionalism at all times. Any behavior negatively impacting the server may result in punishment.')
    );

export async function generateSupportContainer(user) {
    if (!user) {
        return 'false user';
    }

    const verification = getVerificationByDiscord(user.id);

    if (!verification) {
        return 'unverified';
    }

    const robloxId = verification.robloxId;

    let robloxUsername = "Unknown";

    try {
        robloxUsername = await getRobloxUsername(robloxId);
    } catch {
        robloxUsername = "Unavailable";
    }

    return new ContainerBuilder()
        .setAccentColor(0x00C9FF)
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent('# <:Florida:1522322359821008896> | Support Panel')
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setDivider(false)
                .setSpacing(SeparatorSpacingSize.Small)
        )
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(
                    `Welcome **${user.username}** to the Florida State Roleplay support panel! You can find support options such as general or community.\n\n` +
                    `> Before opening a ticket, please ensure you have properly read and understood the general idea of each ticket type.\n\n` +
                    `Here is the Roblox information associated with your account.\n` +
                    `> Roblox ID: ${robloxId}\n` +
                    `> Roblox Username: ${robloxUsername}`
                )
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setDivider(false)
                .setSpacing(SeparatorSpacingSize.Large)
        )
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(
                    `**General Support**\n` +
                    `> *General questions, application inquiries, account assistance, etc.*\n\n` +

                    `**Community Support**\n` +
                    `> *Claim giveaways, submit partnership requests, share suggestions, or discuss community-related topics.*\n\n` +

                    `**Departmental Support**\n` +
                    `> *Department-specific questions, reports, requests, or concerns requiring assistance from a particular department.*\n\n` +

                    `**Internal Affairs**\n` +
                    `> *Report staff misconduct, Terms of Service violations, abuse of permissions, or other policy-related concerns.*\n\n` +

                    `**Management**\n` +
                    `> *For escalations only. Contact Management regarding unresolved issues or matters requiring executive review.*`
                )
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setDivider(true)
                .setSpacing(SeparatorSpacingSize.Large)
        )
        .addActionRowComponents(supportRow1)
        .addMediaGalleryComponents(
            new MediaGalleryBuilder()
                .addItems(
                    new MediaGalleryItemBuilder()
                        .setURL("https://i.imgur.com/y2A68qv.png")
                )
        );
}


export async function generateSupportMessage(user, type, inquiry, ticket) {
    const verification = getVerificationByDiscord(user?.id);

    const robloxId = verification?.robloxId ?? "Unknown";

    let robloxUsername = "Unknown";

    try {
        robloxUsername = await getRobloxUsername(robloxId);
    } catch {
        robloxUsername = "Unavailable";
    }

    return new ContainerBuilder()
        .setAccentColor(0x00C9FF)
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent('# <:Florida:1522322359821008896> | Support')
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setDivider(false)
                .setSpacing(SeparatorSpacingSize.Small)
        )
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(
                    `Welcome, **${user.username}**, to your **${type}** ticket!\n\n` +
                    `A member of the support team will be with you shortly. In the meantime, please elaborate on your inquiry and provide any relevant information to help us assist you.\n\n` +
                    `> Roblox ID: ${robloxId}\n` +
                    `> Roblox Username: ${robloxUsername}\n` +
                    `> Inquiry: ${inquiry}`
                )
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setDivider(true)
                .setSpacing(SeparatorSpacingSize.Large)
        )
        .addActionRowComponents(generateSupportRow2(ticket))
        .addMediaGalleryComponents(
            new MediaGalleryBuilder()
                .addItems(
                    new MediaGalleryItemBuilder()
                        .setURL("https://i.imgur.com/y2A68qv.png")
                )
        );
}


export async function generateSupportCloseDm(user, inquiry, type, ticket) {
    const verification = getVerificationByDiscord(user?.id);

    const robloxId = verification?.robloxId ?? "Unknown";

    let robloxUsername = "Unknown";

    try {
        robloxUsername = await getRobloxUsername(robloxId);
    } catch {
        robloxUsername = "Unavailable";
    }

    return new ContainerBuilder()
        .setAccentColor(0x00C9FF)
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent('# <:Florida:1522322359821008896> | Support')
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setDivider(false)
                .setSpacing(SeparatorSpacingSize.Small)
        )
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(
                    `Hello, **${user.username}**, your **${type}** ticket has been closed.\n\n` +
                    `We hope your inquiry was resolved to your satisfaction. If you have any further questions or concerns, please feel free to open a new ticket.\n\n` +
                    `> Roblox ID: ${robloxId}\n` +
                    `> Roblox Username: ${robloxUsername}\n` +
                    `> Inquiry: ${inquiry}\n` +
                    `> Ticket ID: ${ticket?.id}\n` +
                    `> Closed By: <@${ticket?.closedBy}>\n` +
                    `> Closed At: ${ticket?.closedAt}\n` +
                    `> Response Time: ${ticket?.responseTime ? `${Math.floor(ticket.responseTime / 60000)} minutes` : "Unavailable"}\n` +
                    `> Message Count: ${ticket?.messageCount}\n` +
                    `> Transcript: ${ticket?.transcriptURL ?? "Unavailable"}`
                )
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setDivider(true)
                .setSpacing(SeparatorSpacingSize.Large)
        )
        .addMediaGalleryComponents(
            new MediaGalleryBuilder()
                .addItems(
                    new MediaGalleryItemBuilder()
                        .setURL("https://i.imgur.com/y2A68qv.png")
                )
        );
}


export function generateSupportLogContainer(ticket, channel) {
    if (!ticket) {
        return new ContainerBuilder()
            .setAccentColor(0xFF0000)
            .addTextDisplayComponents(
                new TextDisplayBuilder()
                    .setContent(
                        '# <:Florida:1522322359821008896> | Support Log\n\nUnable to generate ticket log.'
                    )
            )
            .addMediaGalleryComponents(
                new MediaGalleryBuilder()
                    .addItems(
                        new MediaGalleryItemBuilder()
                            .setURL("https://i.imgur.com/y2A68qv.png")
                    )
            );
    }

    return new ContainerBuilder()
        .setAccentColor(0x00C9FF)
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent('# <:Florida:1522322359821008896> | Support Log')
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setDivider(false)
                .setSpacing(SeparatorSpacingSize.Small)
        )
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(
                    `**Ticket Information**\n\n` +
                    `> Ticket ID: ${ticket.id}\n` +
                    `> Opened By: <@${ticket.openedBy}>\n` +
                    `> Type: ${ticket.type}\n` +
                    `> Inquiry: ${ticket.inquiry}\n\n` +

                    `**Timing**\n\n` +
                    `> Opened At: ${ticket.openedAt}\n` +
                    `> Closed At: ${ticket.closedAt}\n\n` +
                    `> Response Time: ${ticket?.responseTime ? `${Math.floor(ticket.responseTime / 60000)} minutes` : "Unavailable"}\n\n` +

                    `**Closure Information**\n\n` +
                    `> Closed By: <@${ticket.closedBy}>\n` +
                    `> Message Count: ${ticket.messageCount}\n` +
                    `> Transcript: ${ticket.transcriptURL ?? "Unavailable"}\n\n` +

                    `**Channel Information**\n\n` +
                    `> Channel: ${channel?.name ?? "Unknown"}`
                )
        )
        .addMediaGalleryComponents(
            new MediaGalleryBuilder()
                .addItems(
                    new MediaGalleryItemBuilder()
                        .setURL("https://i.imgur.com/y2A68qv.png")
                )
        );
}