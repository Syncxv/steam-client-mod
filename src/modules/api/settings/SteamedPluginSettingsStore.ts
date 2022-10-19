export class SteamedPluginSettingsStore {
    constructor(public entityID: string) {}

    get _getSettingsId() {
        return `steamed-plugin-${this.entityID}`;
    }

    getSettings() {
        const str = localStorage.getItem(this._getSettingsId);
        if (!str) {
            localStorage.setItem(this._getSettingsId, '{}');
            return {};
        }
        try {
            return JSON.parse(str);
        } catch (err) {
            console.error('probably corrupt idk', err);
            localStorage.setItem(this._getSettingsId, '{}');
            return {};
        }
    }

    setSettings(settings: Object) {
        localStorage.setItem(this._getSettingsId, JSON.stringify(settings));
    }

    get(key: string, defaultValue?: any) {
        return this.getSettings()[key] ?? defaultValue;
    }

    set(key: string, value: any) {
        const settings = this.getSettings();
        settings[key] = value;
        this.setSettings(settings);
    }

    toggle(key: string) {
        let bool = this.get(key);
        this.set(key, !bool);
    }
}
