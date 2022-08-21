import { ApplicationCommandOptionType } from "discord.js";
import { cassia } from "../../../index.js";
import { Interaction } from "../../structures/datatypes.js";

const Ping = new Interaction({
  options: [
    {
      name: "channel",
      type: ApplicationCommandOptionType.Channel,
      description: "The skullboard will be bound to this channel."
    },
    {
      name: "skull_count",
      type: ApplicationCommandOptionType.Number,
      description: "The number of skulls required to trigger the skullboard."
    }
  ],
  name: "skullboard",
  global: true,
  description: "Creates a skullboard for your server",
  exec: ({ interaction }) => {
    interaction.reply(
      `Created a skullboard in ${
        interaction.options.get("channel").channel
      } that triggers when ${
        interaction.options.get("skull_count").value
      } skull(s) are added.`
    );

    cassia.skullboards.set(interaction.guildId, {
      channelID: interaction.options.get("channel").channel.id,
      starCount: interaction.options.get("skull_count").value
    });
  }
});

export default Ping;
