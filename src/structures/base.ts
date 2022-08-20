import { Client, Collection } from "discord.js";
import {
  ApplicationCommandData,
  ClientData,
  DirectCommandData
} from "../utils/types.js";

import { Util } from "../utils/util.js";

export class Cassia extends Client {
  util: Util;
  data: ClientData;
  commands: Collection<string, DirectCommandData> = new Collection();
  interactions: Collection<string, ApplicationCommandData> = new Collection();
  triggers: Collection<string, any> = new Collection();
  /** Preferences / Options to be passed to the client before initialization
   */
  constructor(data: ClientData) {
    super({
      intents: data.intents
    });

    /** To access a client's data you must pass the
     * data in the constructor upon instantiation. */

    this.data = data;
    this.util = new Util();

    /** Runs functions by the client */
  }
  use(cb: any) {
    cb();
  }

  /** Initiates the client and everything required on startup */

  init() {
    this.login(process.env.TOKEN);
  }
}
