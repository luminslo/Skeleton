import fs from "fs";
import { cassia } from "../../index.js";
async function ListenerHandler() {
    console.log("[ListenerHandler]: Loaded.");
    const isRealDirectory = cassia.util.validateDirectory(cassia.data.listenerDirectory);
    if (!isRealDirectory)
        throw new Error("[ListenerHandler]: The directory you specified in {cassia.data.listenerDirectory} doesn't exist.");
    const files = fs.readdirSync(cassia.data.listenerDirectory);
    files.forEach(async (file) => {
        const listener = await cassia.util.importFile(`../../${cassia.data.listenerDirectory}${file.slice(0, -3)}.js`);
        cassia.on(listener.event, listener.run);
    });
}
export default ListenerHandler;
