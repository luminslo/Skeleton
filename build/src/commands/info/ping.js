import { cassia } from "../../../index.js";
import { Command } from "../../structures/datatypes.js";
const Ping = new Command({
    name: "ping",
    description: "Pong!",
    triggers: ["pong"],
    exec: ({ message }) => {
        message.channel.send(`My ping is ${cassia.ws.ping}ms`);
    }
});
export default Ping;
