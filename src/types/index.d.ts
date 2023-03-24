import { Section } from '@api/settings/PluginSections';

export type AppType = 'friend' | 'library' | 'all'

export type { defualt as WebpackInstance } from './WebpackInstance';
export interface Command {
	name: string
	description: string
	execute: (args: string[], thisObj: any) => void
}

export interface Patch {
	match: string | RegExp
	replace: string | ((substring: string, ...args: any[]) => string)
	predicate?: () => boolean
}
export interface Author {
	name: string
	discordId?: string
}

export interface ItemDef {
	name: string
	description: string
	authors: Author[]
	type?: AppType
	start?(): void
	stop?(): void
	css?: string
	patches?: Patch[]
	commands?: Command[]
	settingsComponent?: Section
}

export interface Plugin extends ItemDef {
	patches?: Patch[]
	styleIds: string[]
	started: boolean
}

export interface ThemeDef extends ItemDef {
	link?: string
}
export interface InlineThemeDef extends ItemDef {
	link: string
}

export interface Theme extends ThemeDef {
	removeCallbacks: (() => void)[]
	styleIds: string[]
	started: boolean
}
