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

import { FriendsUIApp } from "./friendsUiApp";
import { PopupManager } from "./popup";

declare global {
	export var steamed: typeof import("../../steamed");
	export var g_PopupManager: PopupManager;
	export var g_FriendsUIApp: FriendsUIApp;
	interface Window {
		webpackChunkfriendsui: {
			push(chunk: any): any
			pop(): any
		}
		[k: PropertyKey]: any
	}
}
export interface WebpackArray {
	push([[[id]], { }]: [[[id: string]], {}, (require: WebpackRequire) => void]): WebpackRequire
}

export interface WebpackRequire extends Function {
	(id: number | string): any // Just an example
	m: { [key: number]: RawModule }
}

export type RawModule = (what: any, exports: any, n: WebpackRequire) => any

const bruh: WebpackArray = [];
let require: WebpackRequire;


export * from "./popup";
