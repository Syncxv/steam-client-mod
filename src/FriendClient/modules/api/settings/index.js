module.exports = class SettingsAPI {
    constructor(entityID) {
        this.sections = {};
    }

    registerSetting(id, section) {
        if (this.sections[id]) {
            throw new Error(`Settings tab ${id} is already registered!`);
        }
        this.sections[id] = section;
    }

    unregisterSetting(id) {
        if (this.sections[id]) {
            delete this.sections[id];
        }
    }
};
