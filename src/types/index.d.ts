import { Section } from '@api/settings/PluginSections'

export type AppType = 'friend' | 'library' | 'all'

export type { defualt as WebpackInstance } from './WebpackInstance'
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
export interface PluginAuthor {
	name: string
	discordId?: string
}

export interface PluginDef {
	name: string
	description: string
	authors: PluginAuthor[]
	type?: AppType
	start?(): void
	stop?(): void
	css?: string
	patches?: Patch[]
	commands?: Command[]
	settingsComponent?: Section
}

export interface Plugin extends PluginDef {
	patches?: Patch[]
	styleIds: string[]
	started: boolean
}

export interface ThemeDef {
	name: string
	css?: string
	link?: string
	description: string
	authors: PluginAuthor[]
	type: AppType
}

export interface Theme extends ThemeDef {
	removeCallbacks: (() => void)[]
	styleIds: string[]
	started: boolean
}

export interface InlineThemeDef {
	name: string
	link: string
	description: string
	authors: PluginAuthor[]
	type: AppType
}
