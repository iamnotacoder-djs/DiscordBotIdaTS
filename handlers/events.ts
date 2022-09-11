import { lstat, readdir } from 'fs/promises';
import { join } from 'path';

import Client from "../structures/Client";
import BaseEvent from "../structures/BaseEvent";

export default async function init(client: Client) {
    client.logger.send(`[HANDLER/EVENTS] Хандлер событий запущен.`);
    walk(client, './dist/events/');
}

async function walk(client: Client, dir: string) {
    if (Array.isArray(dir)) return;
    if ( !(await lstat(dir)).isDirectory() ) {
        const event: BaseEvent = (await import(`../${dir}`.replace('/dist', '')))?.default;
        if (event.once) {
            client.once(event.name, (...args) => event.execute(client, ...args));
        } else {
            client.on(event.name, (...args) => event.execute(client, ...args));
        }
        client.logger.send(`[HANDLER/EVENTS] Слушатель "${event.name}" загружен.`);
        return;
    }
    for(let file of (await readdir(dir))) {
        await walk(client, join(dir, file));
    }
    return;
}