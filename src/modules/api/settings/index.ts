export * from './SteamedPluginSettingsStore';

export class SettingsAPI {
    sections: {
        [key: string]: {
            title: string;
            identifier: string;
            content: any;
        };
    };
    constructor(public entityID: string) {
        this.sections = {};
    }

    registerSetting(id: string, section: any) {
        if (this.sections[id]) {
            throw new Error(`Settings tab ${id} is already registered!`);
        }
        this.sections[id] = section;
    }

    unregisterSetting(id: string) {
        if (this.sections[id]) {
            delete this.sections[id];
        }
    }
}
