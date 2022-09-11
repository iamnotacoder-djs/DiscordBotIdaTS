import { ApplicationCommandType, BaseInteraction, AutocompleteInteraction, ApplicationCommandData } from "discord.js";
import Client from "../structures/Client";

export default class BaseCommand  {
    
    // Основные параметры
    name: string = "commandname";
    usage: string = "Описание функционала команды";
    type: string[] = [];
    
    // Дополнительные
    slash: ApplicationCommandData = { 
        name: this.name, 
        description: this.usage, 
        type: ApplicationCommandType.ChatInput, 
        options: []
    };
    componentsNames: string[] = [];
    
    // Методы
    
	/**
	 * Создает экземпляр BaseCommand
	 */
    constructor() {
        // do nothing
    }
    
    /**
     * Вызов слушателя команды
     * @param  {Client} client Экземпляр Client
     * @param  {ChatInputCommandInteraction} command Поставляемый объект сообщения или интеракции
      * @returns {Promise<void>}
     */
     async execute(client: Client, command: BaseInteraction): Promise<void> {
          return;
     }

     /**
      * Слушатель компонентов
      * @param  {Client} client Экземпляр Client
      * @param  {BaseInteraction} interaction Поставляемый объект интеракции
      * @returns {Promise<boolean>}
      */
      async componentListener(client: Client, interaction: BaseInteraction): Promise<boolean> {
          return false;
      }
 
     /**
      * Слушатель AutoComlete
      * @param  {Client} client Экземпляр Client
      * @param  {AutocompleteInteraction} interaction Поставляемый объект интеракции
      * @returns {Promise<void>}
      */
      async autocomplete(client: Client, interaction: AutocompleteInteraction) : Promise<void> {
          return;
      }
 
     /**
      * Предустановка таймаутов
      * @param  {Client} client Экземпляр Client
      * @returns {Promise<boolean>}
      */
      async setupTimeouts(client: Client) : Promise<boolean> {
          return false;
      }
}