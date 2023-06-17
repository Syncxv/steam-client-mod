/*
 * Steamed, a modification for the Steam Client
 * Copyright (c) 2023 Syncxv
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

export const _getSettingsId = "STEAMED_GANG";

export const getSettings = () => {
    const str = localStorage.getItem(_getSettingsId);
    if (!str) {
        localStorage.setItem(_getSettingsId, "{}");
        return {};
    }
    try {
        return JSON.parse(str);
    } catch (err) {
        console.error("probably corrupt idk", err);
        localStorage.setItem(_getSettingsId, "{}");
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
    const bool = get(key, false);
    set(key, !bool);
};
