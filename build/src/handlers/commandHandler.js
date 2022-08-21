import fs from "fs";
import { cassia } from "../../index.js";
const CommandHandler = async () => {
    console.log("[CommandHandler]: Loaded.");
    const isRealDirectory = cassia.util.validateDirectory(cassia.data.commandDirectory);
    if (!isRealDirectory)
        throw new Error("[CommandHandler]: The directory you specified in {cassia.data.commandDirectory} doesn't exist.");
    const folders = fs.readdirSync(cassia.data.commandDirectory);
    for (const folder of folders) {
        const files = fs
            .readdirSync(`${cassia.data.commandDirectory}/${folder}`)
            .filter((file) => file.endsWith(".ts"));
        for (const file of files) {
            const command = await cassia.util.importFile(`../../${cassia.data.commandDirectory}/${folder}/${file.slice(0, -3)}.js`);
            cassia.commands.set(command.name, command);
        }
    }
};
export default CommandHandler;
