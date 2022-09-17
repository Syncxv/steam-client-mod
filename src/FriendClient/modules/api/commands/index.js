class CommandAPI {
    constructor() {
        this.commands = {};
    }
    get prefix() {
        return steamed.settings.get('prefix', '.');
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

    new(cmd) {
        if (!typeof cmd === 'object' && cmd !== null) {
            throw Error('invald command');
        }
        if (this.commands[cmd.name]) throw Error(`Name ${cmd.name} already exists boy`);
        this.commands[cmd.name] = cmd;
    }
    delete(name) {
        let value;
        this.command[name] ? (delete this.commands[name], (value = true)) : (value = false);
        return value;
    }
    registerCommand(cmd) {
        this.new(cmd);
    }
    unregisterCommand(cmd) {
        this.delete(cmd);
    }
}

module.exports = CommandAPI;
