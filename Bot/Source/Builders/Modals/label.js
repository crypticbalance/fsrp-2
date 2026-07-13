import { LabelBuilder } from "discord.js";
import { ticketInput } from "./Input/text.js";

export const ticketLabel = new LabelBuilder()
    .setLabel('Inquiry')
    .setDescription('Explain why you are opening this ticket. Responses must be over 15 characters.')
    .setTextInputComponent(ticketInput)