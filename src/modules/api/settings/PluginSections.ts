export interface PluginSections {
    [key: string]: {
        title: string;
        identifier: string;
        content: any;
    };
}

let sections: PluginSections = {};

export const registerSetting = (id: string, section: any) => {
    if (sections[id]) {
        throw new Error(`Settings tab ${id} is already registered!`);
    }
    sections[id] = section;
};

export const unregisterSetting = (id: string) => {
    if (sections[id]) {
        delete sections[id];
    }
};
