import { Client, GatewayIntentBits, Partials } from "discord.js";
import { manager } from "./manager.js";
import "dotenv/config";
const client = new Client({ intents: Object.values(GatewayIntentBits), partials: Object.values(Partials)})
client.on('clientReady',async()=>{await manager(client)})
client.login(process.env.token);