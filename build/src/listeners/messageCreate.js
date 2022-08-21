import { cassia } from "../../index.js";
import { Listener } from "../structures/datatypes.js";
export default new Listener("messageCreate", false, async (message) => {
    if (message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(cassia.data.prefix))
        return;
    const [name, ...args] = message.content
        .slice(cassia.data.prefix.length)
        .trim()
        .split(/ +/g);
    const command = cassia.commands.get(name.toLowerCase()) ||
        cassia.commands.find((c) => c.triggers.includes(name.toLowerCase()));
    if (command) {
        command.exec({
            args,
            cassia,
            message
        });
    }
    else {
        message.channel.send("This command doesn't exist. Try `c.help`.");
    }
});
