import { TextDisplayBuilder } from "discord.js";

export function assertTicketType(type) {
    return new TextDisplayBuilder()
        .setContent(`Please confirm your inquiry for your **${type}** ticket.`)
}