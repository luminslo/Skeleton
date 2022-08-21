import { cassia } from "../../index.js";
import { Listener } from "../structures/datatypes.js";
import { interactions } from "../handlers/interactionHandler.js";
export default new Listener("ready", true, () => {
    cassia.user.setPresence({
        activities: [{ name: "Beta Preview" }],
        status: "dnd"
    });
    cassia.application.commands.set(interactions);
    console.log("Ready!");
});
