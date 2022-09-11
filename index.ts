import Client from "./structures/Client";
import { IntentsBitField } from "discord.js";

const client = new Client({
    intents: [ IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.DirectMessages ]
});

require('dotenv').config()

client.login(process.env.TOKEN)
    .then(async () => {
        await client.logger.init(client);
        client.logger.send(`[INDEX] Инициализация бота`);

        (await import(`./handlers/events`)).default(client).catch(client.logger.error);
        (await import(`./handlers/commands`)).default(client).catch(client.logger.error);
        client.on('error', client.logger.error)
        client.on('warn', client.logger.send)
        process.on('uncaughtException', client.logger.error);
        process.on('unhandledRejection', client.logger.error);
    });

export default client;