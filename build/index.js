import { GatewayIntentBits, Partials } from "discord.js";
import { Cassia } from "./src/structures/base.js";
import CommandHandler from "./src/handlers/commandHandler.js";
import InteractionHandler from "./src/handlers/interactionHandler.js";
import ListenerHandler from "./src/handlers/listenerHandler.js";
import * as dotenv from "dotenv";
dotenv.config();
export const cassia = new Cassia({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions
    ],
    partials: [
        Partials.Message,
        Partials.Reaction,
        Partials.Channel,
        Partials.User,
        Partials.GuildMember
    ],
    developers: ["724098984100869120"],
    commandDirectory: "./src/commands/",
    interactionDirectory: "./src/interactions/",
    listenerDirectory: "./src/listeners/",
    prefix: "c."
});
cassia.use(ListenerHandler);
cassia.use(CommandHandler);
cassia.use(InteractionHandler);
cassia.init();
