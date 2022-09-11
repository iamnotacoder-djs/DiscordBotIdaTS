import { Message } from "discord.js";
import BaseEvent from "../structures/BaseEvent";
import Client from "../structures/Client";

const event: BaseEvent = {
    name: 'messageCreate',
    once: false,
    async execute(client: Client, message: Message) {
        await client.logger.init(client);
    }
}

export default event;