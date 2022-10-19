import { Command } from '../../../types';

export class CommandAPI {
    public commands: { [key: string]: Command };
    constructor() {
        this.commands = {};
    }
    get prefix() {
        return steamed.Settings.get('prefix', '.');
    }

    get find() {
        const arr = Object.values(this.commands);
        return arr.find.bind(arr);
    }

    get filter() {
        const arr = Object.values(this.commands);
        return arr.filter.bind(arr);
    }

    get map() {
        const arr = Object.values(this.commands);
        return arr.map.bind(arr);
    }

    get sort() {
        const arr = Object.values(this.commands);
        return arr.sort.bind(arr);
    }

    get length() {
        return Object.values(this.commands).length;
    }

    new(cmd: Command) {
        if (this.commands[cmd.name]) throw Error(`Name ${cmd.name} already exists boy`);
        this.commands[cmd.name] = cmd;
    }
    delete(name: string) {
        let value;
        this.commands[name] ? (delete this.commands[name], (value = true)) : (value = false);
        return value;
    }
}
