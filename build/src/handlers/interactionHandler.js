import { cassia } from "../../index.js";
import fs from "fs";
export const interactions = [];
const InteractionHandler = async () => {
    console.log("[InteractionHandler]: Loaded.");
    const isRealDirectory = cassia.util.validateDirectory(cassia.data.interactionDirectory);
    if (!isRealDirectory)
        throw new Error("[InteractionHandler]: The directory you specified in {cassia.data.interactionDirectory} doesn't exist.");
    const folders = fs.readdirSync(cassia.data.interactionDirectory);
    for (const folder of folders) {
        const files = fs
            .readdirSync(`${cassia.data.interactionDirectory}/${folder}`)
            .filter((file) => file.endsWith(".ts"));
        for (const file of files) {
            const command = await cassia.util.importFile(`../../${cassia.data.interactionDirectory}/${folder}/${file.slice(0, -3)}.js`);
            if (command.global)
                interactions.push(command);
            cassia.interactions.set(command.name, command);
        }
    }
};
export default InteractionHandler;
