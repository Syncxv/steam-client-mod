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
