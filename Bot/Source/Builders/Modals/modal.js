import { ModalBuilder } from "discord.js";
import { ticketLabel } from "./label.js";
import { assertTicketType } from "./textDisplay.js";

export function generateTicketModal(type) {
    const ticketModal = new ModalBuilder()
        .setCustomId(`ticketsModal-${type}`)
        .setTitle('Florida State Roleplay — Support')
        .addLabelComponents(ticketLabel)
        .addTextDisplayComponents(assertTicketType(type));

    return ticketModal;
}