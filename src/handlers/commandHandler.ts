import fs from "fs";
import { cassia } from "../../index.js";
import { DirectCommandData } from "../utils/types.js";

/** Connects command files to the client. */
const CommandHandler = async () => {
  console.log("[CommandHandler]: Loaded.");
  const isRealDirectory = cassia.util.validateDirectory(
    cassia.data.commandDirectory
  );
  if (!isRealDirectory)
    throw new Error(
      "[CommandHandler]: The directory you specified in {cassia.data.commandDirectory} doesn't exist."
    );
  /** For each folder within cassia.commandDirectory, it's files are registered */
  const folders = fs.readdirSync(cassia.data.commandDirectory);
  for (const folder of folders) {
    const files = fs
      .readdirSync(`${cassia.data.commandDirectory}/${folder}`)
      .filter((file) => file.endsWith(".ts"));
    for (const file of files) {
      /** For each file we:  slice off it's extension, i.e (.ts), and append .js to it. */
      const command: DirectCommandData = await cassia.util.importFile(
        `../../${cassia.data.commandDirectory}/${folder}/${file.slice(
          0,
          -3
        )}.js`
      );
      /** Adds the command and it's name to a
			  collection for later use.
			*/
      cassia.commands.set(command.name, command);
    }
  }
};
export default CommandHandler;
