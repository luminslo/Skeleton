import { cassia } from "../../index.js";
import fs from "fs";
import { ApplicationCommandData } from "../utils/types.js";
import { ApplicationCommandDataResolvable } from "discord.js";

export const interactions: ApplicationCommandDataResolvable[] = [];
const InteractionHandler = async () => {
  console.log("[InteractionHandler]: Loaded.");
  const isRealDirectory = cassia.util.validateDirectory(
    cassia.data.interactionDirectory
  );
  if (!isRealDirectory)
    throw new Error(
      "[InteractionHandler]: The directory you specified in {cassia.data.interactionDirectory} doesn't exist."
    );

  const folders = fs.readdirSync(cassia.data.interactionDirectory);
  for (const folder of folders) {
    const files = fs
      .readdirSync(`${cassia.data.interactionDirectory}/${folder}`)
      .filter((file) => file.endsWith(".ts"));
    for (const file of files) {
      /** For each file we:  slice off it's extension, i.e (.ts), and append .js to it. */
      const command: ApplicationCommandData = await cassia.util.importFile(
        `../../${cassia.data.interactionDirectory}/${folder}/${file.slice(
          0,
          -3
        )}.js`
      );
      /** Adds the command and it's name to a
			  collection for later use.
			*/
      if (command.global) interactions.push(command);
      cassia.interactions.set(command.name, command);
    }
  }
};
export default InteractionHandler;
