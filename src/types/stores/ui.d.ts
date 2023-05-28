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

import { GenericCallbackObject, m_CMInterface } from "../global/friendsUiApp";
import { ChatStore } from "./chat";

export interface UIStore {
	m_CMInterface: m_CMInterface
	m_FriendsListSteamDeckActiveTabCallbackList: Omit<GenericCallbackObject, "">[]
	m_bParentalLocked: boolean
	m_bRestoredPopupState: boolean
	m_bRestoringPopups: boolean
	get m_bShowWinterSaleUI(): boolean
	m_bShuttingDown: boolean
	m_bSuppressBrowserContextBroadcasting: boolean
	m_bTheaterMode: boolean

	m_chatStore: ChatStore

	m_eFriendsListSteamDeckActiveTab: number
	m_iLastChatPopupID: number

	// TODO: type browser context
	m_mapChatBrowserContexts: Map<string, any>;


	m_mapFriendChatBroadcastVisible: {
		enhancer: Function;
		name: string
		get size(): number
		_data: Map<any, any>
		_hasMap: Map<string, any>
		_keysAtom: {
			name: string,
			isPendingUnobservation: boolean,
			isBeingObserved: boolean,
			lastAccessedBy: number
			lowestObserverState: number
			observers: Set<any>, diffValue: number,
		}
		get m_nTabActivationCount(): number
		m_overlayCreatedCallbackList: GenericCallbackObject[]
		m_stateToRestoreFrom: undefined
		m_vecShowGroupsAfterRestorePopup: []
		get FriendsListSteamDeckActiveTab(): number
		SerializePopupState: Function
		get show_winter_sale_ui(): boolean
		get m_bShowWinterSaleUI(): Function
		set m_bShowWinterSaleUI(): Function
		get m_bTheaterMode(): Function
		set m_bTheaterMode(): Function
		get m_mapFriendChatBroadcastVisible(): Function
		set m_mapFriendChatBroadcastVisible(): Function
		get m_nTabActivationCount(): Function
		set m_nTabActivationCount(): Function
	}

	m_nTabActivationCount: number
	m_overlayCreatedCallbackList: GenericCallbackObject[]
	m_stateToRestoreFrom: any
	m_vecShowGroupsAfterRestorePopup: any[]
}
