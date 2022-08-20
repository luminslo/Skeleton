import { CommandInteractionOptionResolver } from "discord.js";
import { cassia } from "../../index.js";
import { Listener } from "../structures/datatypes.js";

export default new Listener("interactionCreate", false, (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = cassia.interactions.get(interaction.commandName);
    command.exec({
      interactionArgs: interaction.options as CommandInteractionOptionResolver,
      cassia,
      interaction
    });
  }
});
