import { Section } from '../modules/api/settings/PluginSections';

export type { defualt as WebpackInstance } from './WebpackInstance';
export interface Command {
    name: string;
    description: string;
    execute: (args: string[], thisObj: any) => void;
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
    type?: 'friend' | 'library';
    start?(): void;
    stop?(): void;
    patches?: Patch[];
    commands?: Command[];
    settingsComponent?: Section;
}

export interface Plugin extends PluginDef {
    patches?: Patch[];
    started: boolean;
}
