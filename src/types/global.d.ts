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

declare global {
	export var steamed: typeof import('../steamed');
	export var g_PopupManager: T_gPopupManager;
	export var g_FriendsUIApp: any;
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
	m: { [key: number]: RawSpotifyModule }
}

export type RawSpotifyModule = (what: any, exports: any, n: WebpackRequire) => any

const bruh: WebpackArray = [];
let require: WebpackRequire;
export interface PopupCallback {
	(popup: TPopup): any
	id?: string
	[key: string]: any
}
interface T_gPopupManager {
	m_DynamicCSSObserver: MutationObserver
	m_bSaveRequired: boolean
	m_bShuttingDown: boolean
	m_mapPopups: Map<string, TPopup>
	m_mapRestoreDetails: Map<string, any>
	m_rgPopupCreatedCallbacks: PopupCallback[]
	m_rgShutdownCallbacks: PopupCallback[]
	m_unCurrentAccountID: number

	AddPopupCreatedCallback: Function
	AddShutdownCallback: Function
	AddTrackedPopup: Function
	BAnyMenuHasFocus: Function
	BAnyPopupHasFocus: Function
	BShuttingDown: Function
	ClearSavedDimensionStore: Function
	ClosePopupsOwnedByBrowser: Function
	DebouncedSaveSavedDimensionStore: Function
	GetExistingPopup: Function
	GetLocalStorageKey: Function
	GetPopups: Function
	GetRestoreDetails: Function
	LoadSavedDimensionStore: Function
	RemoveTrackedPopup: Function
	SaveSavedDimensionStore: Function
	SetCurrentLoggedInAccountID: Function
	SetRestoreDetails: Function
}

interface TPopup {
	m_bCreateHidden: boolean
	m_bCreated: boolean
	m_bExpires: boolean
	m_bFocused: boolean
	m_chats: any

	m_element: HTMLElement
	window: Window

	m_onCreateRendered: Function | null
	m_popup: Window
	m_popupActionDisposer: Function
	m_renderWhenReady: {
		m_rgLoadingLinks: string[]
		m_fnRender?: Function | null
		OnLinkLoad: Function
	}

	m_rgParams: {
		html_class: string
		body_class: string
		minWidth: number
		minHeight: number
		strRestoreDetails: string
		target_browser?: any
	}

	m_strInitialRestoreDetails: string
	m_strInitialSavedDimensionsKey: string
	m_strName: string
	m_strSavedDimensionsKey: string
	m_strTitle: string

	m_tabSet: any

	OnBeforeUnloadEvent: Function
	OnBlurInternal: Function
	OnCreateInternal: Function
	OnFocusInternal: Function
	OnMessage: Function
	OnResizeEvent: Function
	OnUnload: Function
	QueryAndStoreWindowPosition: Function
	RenderInternal: Function
	SetTitle: Function
}
