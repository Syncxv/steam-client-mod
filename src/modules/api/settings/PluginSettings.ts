export let _getSettingsId = `STEAMED_GANG`;

export const getSettings = () => {
    const str = localStorage.getItem(_getSettingsId);
    if (!str) {
        localStorage.setItem(_getSettingsId, '{}');
        return {};
    }
    try {
        return JSON.parse(str);
    } catch (err) {
        console.error('probably corrupt idk', err);
        localStorage.setItem(_getSettingsId, '{}');
        return {};
    }
};

export const setSettings = (settings: Object) => {
    localStorage.setItem(_getSettingsId, JSON.stringify(settings));
};
export const get = <T>(key: string, defaultValue: T): T => {
    return getSettings()[key] ?? defaultValue;
};

export const set = (key: string, value: any) => {
    const settings = getSettings();
    settings[key] = value;
    setSettings(settings);
};

export const toggle = (key: string) => {
    let bool = get(key, false);
    set(key, !bool);
};
