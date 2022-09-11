'use strict';

import { ApplicationCommandType, AutocompleteInteraction, BaseInteraction, CacheType, ChatInputCommandInteraction, ApplicationCommandData } from "discord.js";
import BaseCommand from "../structures/BaseCommand";
import Client from "../structures/Client";
import Config from "../structures/ConfigUtil";

export default class Ping extends BaseCommand {

	name: string = "ping";
	usage: string = "Replies with Pong!";
	type: string[] = [ Config.CommandType.CHAT, Config.CommandType.SLASH_APPLICATION ];
	slash: ApplicationCommandData = {
		name: this.name,
		description: this.usage,
		type: ApplicationCommandType.ChatInput,
		options: [],
		nameLocalizations: {
			"ru": "пинг",
			"uk": "пінг",
			"en-US": "ping",
			"en-GB": "ping"
		},
		descriptionLocalizations: {
			"ru": "Отвечает - Понг!",
			"uk": "Відповідає - Понг!",
			"en-US": "Replies with Pong!",
			"en-GB": "Replies with Pong!"
		}
	};
	componentsNames: string[] = [];

	constructor() {
		super();
	}

	async execute(client: Client, command: ChatInputCommandInteraction) {
		let reply = "🏓 Pong";
		let message = await command.reply({
			content: reply,
			fetchReply: true
		});
		if (command.inGuild()) {
			switch (command.guild!.preferredLocale) {
				case "ru": reply = "🏓 Понг";
				case "uk": reply = "🏓 Понг";
				default: reply = "🏓 Pong";
			}
		}
		message.edit({
			content: `${reply}: ${(Date.now() - command.createdTimestamp)}`
		});
	}

	async componentListener(client: Client, interaction: BaseInteraction<CacheType>): Promise<boolean> {
		return false;
	}

	async autocomplete(client: Client, interaction: AutocompleteInteraction<CacheType>): Promise<void> {
		return;
	}

	async setupTimeouts(client: Client): Promise<boolean> {
		return false;
	}
}