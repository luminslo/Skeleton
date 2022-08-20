import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  SlashCommandBuilder
} from "discord.js";
import { Interaction } from "../../structures/datatypes.js";

const Ping = new Interaction({
  name: "ban",
  description: "Ban a user from the server.",
  global: true,
  options: [
    {
      name: "user",
      description: "The user being banned",
      type: ApplicationCommandOptionType.User,
      required: true
    },
    {
      name: "reason",
      description: "The reason for the ban",
      type: ApplicationCommandOptionType.String
    }
  ],
  defaultMemberPermissions: ["BanMembers"],
  exec: ({ interaction }) => {
    interaction.reply(
      interaction.options.get("user").user.toString() +
        " was banned by " +
        interaction.user.toString() +
        " because of " +
        "`" +
        interaction.options.get("reason").value +
        "`."
    );
  }
});

export default Ping;
