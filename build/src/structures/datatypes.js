export class Command {
    data;
    constructor(commandOptions) {
        Object.assign(this, commandOptions);
    }
}
export class Interaction {
    data;
    constructor(commandOptions) {
        Object.assign(this, commandOptions);
    }
}
export class Listener {
    event;
    once;
    run;
    constructor(event, once, run) {
        this.event = event;
        this.once = once;
        this.run = run;
    }
}
