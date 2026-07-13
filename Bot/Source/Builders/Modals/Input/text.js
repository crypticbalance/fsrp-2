import { TextInputBuilder, TextInputStyle} from "discord.js";

export const ticketInput = new TextInputBuilder()
    .setCustomId('ticketInput')
	.setStyle(TextInputStyle.Short)
	.setPlaceholder('What are the criteria of applying to staff?')
    .setMinLength(15);
