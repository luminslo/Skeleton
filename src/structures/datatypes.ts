import { ApplicationCommandData, DirectCommandData } from "../utils/types";
import { ClientEvents } from "discord.js";

export class Command {
  data: DirectCommandData;
  constructor(commandOptions: DirectCommandData) {
    Object.assign(this, commandOptions);
  }
}

export class Interaction {
  data: ApplicationCommandData;
  constructor(commandOptions: ApplicationCommandData) {
    Object.assign(this, commandOptions);
  }
}

export class Listener<Key extends keyof ClientEvents> {
  constructor(
    public event: Key,
    public once: boolean,
    public run: (...args: ClientEvents[Key]) => any
  ) {}
}
