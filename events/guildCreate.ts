import { Guild } from "discord.js";
import BaseEvent from "../structures/BaseEvent";
import Client from "../structures/Client";

const event: BaseEvent = {
    name: 'guildCreate',
    once: false,
    async execute(client: Client, guild: Guild) {
        await client.logger.init(client);
    }
}

export default event;