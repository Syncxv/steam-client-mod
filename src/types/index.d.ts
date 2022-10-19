export type { defualt as WebpackInstance } from './WebpackInstance';
export interface Command {
    name: string;
    description: string;
    execute: () => void;
}

export interface Patch {
    match: string | RegExp;
    replace: string | ((match: string, ...groups: string[]) => string);
}
export interface PluginAuthor {
    name: string;
    discordId?: string;
}

export interface PluginDef {
    name: string;
    description: string;
    authors: PluginAuthor[];
    start?(): void;
    stop?(): void;
    patches?: Patch[];
    settingsAboutComponent?: React.ComponentType;
}

export interface Plugin extends PluginDef {
    patches?: Patch[];
    started: boolean;
}
