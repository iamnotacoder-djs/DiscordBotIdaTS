import { ApplicationCommandDataResolvable } from 'discord.js';
import { lstat, readdir } from 'fs/promises';
import { join } from 'path';
import Client from "../structures/Client";
import BaseCommand from "../structures/BaseCommand";
import Config from "../structures/ConfigUtil";

export default async function init(client: Client) {
    client.logger.send(`[HANDLER/EVENTS] Хандлер Slash-комманд запущен.`);
    const slashes: ApplicationCommandDataResolvable[] | void = await walk(client, './dist/commands/').catch(client.logger.error);
    if (!Array.isArray(slashes)) return;
    client.application!.commands.set(slashes)
        .then(() => {
            client.logger.send(`[HANDLER/COMMANDS] Установлено ${slashes.length} глобальных slash-комманд.`);
        })
        .catch((e) => {
            client.logger.error(`[HANDLER/COMMANDS] Ошибка установки глобальных slash-комманд: ${e}`);
        });
    client.logger.send(`[HANDLER/COMMANDS] Загружено ${client.commands.size} комманд.`);
}

async function walk(client: Client, dir: string, slashes: ApplicationCommandDataResolvable[] = []): Promise<ApplicationCommandDataResolvable[]> {
    if (Array.isArray(dir)) return slashes;
    if ( !(await lstat(dir)).isDirectory() ) {
        const command: BaseCommand = new ((await import(`../${dir}`.replace('/dist', '')))?.default);
        client.commands.set(command.name, command);
        if (command.type.includes(Config.CommandType.SLASH_APPLICATION)) slashes.push(command.slash);
        return slashes;
    }
    for(let file of (await readdir(dir))) {
        await walk(client, join(dir, file), slashes);
    }
    return slashes;
}