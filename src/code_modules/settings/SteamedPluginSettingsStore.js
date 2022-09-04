module.exports = class SteamedPluginSettingsStore {
    constructor(entityID) {
        this.entityID = entityID;
    }

    get _getSettingsId() {
        return `steamed-plugin-${this.entityID}`;
    }

    getSettings() {
        const str = localStorage.getItem(this._getSettingsId);
        if (!str) {
            localStorage.setItem(this._getSettingsId, '{}');
            return JSON.parse(localStorage.getItem(this._getSettingsId));
        }
        try {
            return JSON.parse(str);
        } catch (err) {
            console.error('probably corrupt idk', err);
            localStorage.setItem(this._getSettingsId, '{}');
            return JSON.parse(localStorage.getItem(this._getSettingsId));
        }
    }

    setSettings(settings) {
        localStorage.setItem(this._getSettingsId, JSON.stringify(settings));
    }

    get(key, def) {
        return this.getSettings()[key] ?? def;
    }

    set(key, value) {
        const settings = this.getSettings();
        settings[key] = value;
        this.setSettings(settings);
    }

    toggle(key) {
        let bool = this.get(key);
        this.set(key, !bool);
    }
};
