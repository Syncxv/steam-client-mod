module.exports = class SteamedPluginSettingsStore {
    constructor(entityID) {
        this.entityID = entityID;
    }

    get _getLocalStoragePluginPrefix() {
        return `steamed-plugin-${this.entityID}`;
    }

    get(key, def) {
        const str = localStorage.getItem(`${this._getLocalStoragePluginPrefix}-${key}`);
        return str ? JSON.parse(str) : def;
    }

    set(key, value) {
        localStorage.setItem(`${this._getLocalStoragePluginPrefix}-${key}`, JSON.stringify(value));
    }

    toggle(key) {
        let bool = this.get(key);
        this.set(key, !bool);
    }
};
