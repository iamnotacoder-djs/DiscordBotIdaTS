import { Client, ClientOptions, Collection } from "discord.js";

import BaseCommand from "./BaseCommand";
import Logger from "./Logger";
import Timeout from "./Timeout";

export default class DiscordClient extends Client<true> {
    
    readonly commands: Collection<string, BaseCommand> = new Collection();
    readonly logger: Logger = new Logger();
    readonly timeout1h: Timeout = new Timeout(1000 * 60 * 60, true);

    constructor(data: ClientOptions) {
        super(data);
    };
}