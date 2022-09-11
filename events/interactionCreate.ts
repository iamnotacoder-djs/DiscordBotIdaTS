import { InteractionType, EmbedBuilder } from "discord.js";

import BaseCommand from "../structures/BaseCommand";
import Client from "../structures/Client";
import Config from "../structures/ConfigUtil";
import BaseEvent from "../structures/BaseEvent";

const cooldown = new Map();

const event: BaseEvent = {
    name: 'interactionCreate',
    once: false,
    // Уж извините за any, пошло оно все в п/////
    async execute(client: Client, interaction: any) {
        await client.logger.init(client);

        // Кулдаун на команды
		if (![InteractionType.ApplicationCommandAutocomplete, InteractionType.ModalSubmit].includes(interaction?.type)) {
            const _cooldown = cooldown.get(interaction.user.id) ?? 0;
            if (Date.now() - _cooldown < 2000) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`На команды бота установлен кулдаун :/`)
                            .setColor(Config.embed_color)
                    ],
                    ephemeral: true
                });
            }
            cooldown.set(interaction.user.id, Date.now());
		}

        // Slash команды и Autocomplete
        if (interaction.isChatInputCommand() || interaction.isContextMenuCommand() || interaction?.type == InteractionType.ApplicationCommandAutocomplete) {
            // Получаем команду их хандлера по имени
            const cmd: BaseCommand | undefined = client.commands.get(interaction.commandName);
            // Проверяем соответствия
            if (cmd) {
                function _catch(e: Error) {
                    // Сообщаем об ошибке
                    client.logger.error(`[EVENT/INTERACTIONCREATE] Ошибка выполнения команды ${cmd?.name}: ${e}`);
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()                                
                                .setDescription(`Ошибка выполнения команды ${cmd?.name}`)
                                .setColor(Config.embed_color)
                        ],
                        ephemeral: true
                    });
                }
                if (interaction?.type == InteractionType.ApplicationCommandAutocomplete) {
                    cmd.autocomplete(client, interaction).catch(_catch);
                } else {
                    cmd.execute(client, interaction).catch(_catch);
                }
            }
        } else {
			let found = false;
            for(let cmdkey of client.commands.keys()) {
                const cmd: BaseCommand | undefined = client.commands.get(cmdkey);
                if (cmd) {
                    let regexName = false;
                    cmd.componentsNames.forEach((name: string) => {
                        if (name.includes('...') && interaction.customId.includes(name.replace('...', ''))) regexName = true;
                    });
                    let customId: string = interaction.customId;
                    if ((cmd.componentsNames.includes(customId) || regexName) && 
                        await cmd.componentListener(client, interaction).catch((e) => {
                            if (!interaction.replied) interaction.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setDescription(`Ошибка компонента ${interaction.customId}`)
                                        .setColor(Config.embed_color)
                                ],
                                ephemeral: true
                            });
                            client.logger.error(`[EVENT/INTERACTIONCREATE] Ошибка компонента ${interaction.customId}: ${e}`);
                        })
                    ) found = true;
                }
            }

			if (!found && !interaction.replied) interaction.deferUpdate();
        }
    }
}

export default event;