import { Client, Collection } from "discord.js";
import { Util } from "../utils/util.js";
export class Cassia extends Client {
    util;
    data;
    commands = new Collection();
    interactions = new Collection();
    triggers = new Collection();
    skullboards = new Collection();
    constructor(data) {
        super({
            intents: data.intents
        });
        this.data = data;
        this.util = new Util();
    }
    use(cb) {
        cb();
    }
    init() {
        this.login(process.env.TOKEN);
    }
}
