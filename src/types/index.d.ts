import { Section } from '../modules/api/settings/PluginSections';

export type { defualt as WebpackInstance } from './WebpackInstance';
export interface Command {
    name: string;
    description: string;
    execute: (args: string[], thisObj: any) => void;
}

export interface Patch {
    match: string | RegExp;
    replace: string | ((substring: string, ...args: any[]) => string);
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
    css?: string;
    patches?: Patch[];
    commands?: Command[];
    settingsComponent?: Section;
}

export interface Plugin extends PluginDef {
    patches?: Patch[];
    started: boolean;
}

export interface ThemeDef {
    name: string;
    css: string;
    description: string;
    authors: PluginAuthor[];
    type: 'friend' | 'library';
}

export interface Theme extends ThemeDef {
    styleIds: string[];
    started: boolean;
}
