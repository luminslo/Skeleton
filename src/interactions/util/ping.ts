import { ApplicationCommandType } from "discord.js";
import { cassia } from "../../../index.js";
import { Interaction } from "../../structures/datatypes.js";

const Ping = new Interaction({
  name: "ping",
  global: true,
  description: "Pong!",
  exec: ({ interaction }) => {
    interaction.reply(`My latency is ${cassia.ws.ping}ms.`);
  }
});

export default Ping;
