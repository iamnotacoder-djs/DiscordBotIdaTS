import { HexColorString } from "discord.js";

class ConfigUtil {

    debug: boolean = true;

    embed_color: HexColorString = "#ffc200";
    controller_guild: string = "1003194929905934478";
    controller_logs: string = "1003210413636325386";

	CommandType = { UNSET: 'unset', CHAT: 'chat', SLASH: 'slash', SLASH_APPLICATION: 'slash_application', CTX_USER: 'context_user', CTX_MESSAGE: 'context_message' };

    constructor() {
        return this;
    }
}

export default new ConfigUtil();