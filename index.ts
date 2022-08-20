import { GatewayIntentBits } from "discord.js";
import { Cassia } from "./src/structures/base.js";

import CommandHandler from "./src/handlers/commandHandler.js";
import InteractionHandler from "./src/handlers/interactionHandler.js";
import ListenerHandler from "./src/handlers/listenerHandler.js";

import * as dotenv from "dotenv";

dotenv.config();

/** Specify client configuration options */

export const cassia = new Cassia({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  developers: ["724098984100869120"],
  commandDirectory: "./src/commands/",
  interactionDirectory: "./src/interactions/",
  listenerDirectory: "./src/listeners/",
  prefix: "c."
});

/** Execute required handlers */
cassia.use(ListenerHandler);
cassia.use(CommandHandler);
cassia.use(InteractionHandler);

cassia.init();
