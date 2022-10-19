export interface Section {
    title: string;
    identifier: string;
    content: any;
}

export interface PluginSections {
    [key: string]: Section;
}

export let sections: PluginSections = {};

export const registerSetting = (id: string, section: Section) => {
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
