import { TextChannel, Message } from "discord.js";
import Client from "./Client";
import Config from "./ConfigUtil";

export default class Logger {
    
    logs = new Map();
    client: Client | null = null;
    channel: TextChannel | null = null;

	/**
	 * Создает экземпляр Logger
	 */
    constructor() {
    }

	/**
	 * Обновление Client, если он еще не был указан
	 * @param  {Client} Экземпляр Client для доступа к каналу логов
     * @returns {boolean} Найден ли канал логов
	 */
    async init(client: Client): Promise<boolean> {
        this.client = client;
        let _channel = await this.client.channels.fetch(Config.controller_logs).catch(() => {});
        if (_channel instanceof TextChannel) {
            this.channel = _channel;
        }
        return _channel instanceof TextChannel;
    }

    /**
     * Вывод текста в консоль(debug?) и канал для логов
     * @param  {string} text Текст сообщения
     */
    send(text: string | Error): void {
        if (Config.debug || !this.channel) console.log(text);
        let logMessage = text instanceof Error? `${text}` : text;
        if (this.channel) {
            let key: string = `[]`;
            let regex: Array<string> | null = logMessage.match(/(\[)([a-z].*)(\])/ig);
            if (Array.isArray(regex)) {
                key = regex[0];
            }
            if (!this.logs.has(logMessage)) {
                this.channel.send({
                    content: `${logMessage}`,
                    allowedMentions: {
                        users: []
                    }
                })
                .then((message: Message) => {
                    this.logs.set(logMessage, {
                        t: Date.now(),
                        m: message.id, 
                        c: 1
                    });
                })
                .catch(console.error);
            } else {
                if (Date.now() - this.logs.get(logMessage).t > 1000 * 60 * 60) {
                    this.channel.send({
                        content: `${logMessage}`,
                        allowedMentions: {
                            users: []
                        }
                    })
                    .then((message: Message) => {
                        this.logs.set(logMessage, {
                            t: Date.now(),
                            m: message.id, 
                            c: 1
                        });
                    })
                    .catch(console.error);
                } else {
                    this.channel.messages.fetch(this.logs.get(logMessage).m)
                    .then((message: Message) => {
                        this.logs.set(logMessage, {
                            t: Date.now(),
                            m: message.id, 
                            c: this.logs.get(logMessage).c + 1
                        });
                        message.edit({
                            content: `${logMessage} (${this.logs.get(logMessage).c})`
                        });
                    })
                    .catch(console.error);
                }
            }
        }
    }

    /**
     * Вывод ошибки в консоль и канал для логов
     * @param  {string | Error} text Текст сообщения
     */
    error(text: string | Error) {
        console.error(text);
        let channel = this?.channel;
        if (channel instanceof TextChannel) {
            channel.send(`@everyone\n${text}`).catch(console.error);
        }
    }
}