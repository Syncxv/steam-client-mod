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

import { GenericCallback } from './popup';

interface GenericCallbackObject {
	m_vecCallbacks: GenericCallback
}

interface GenericConnectCallbacks {
	m_ClientConnectionCallbacks: GenericCallbackObject[]
	m_bRunOnce: boolean
	m_mapServerTypeCallbacks: Map<number, GenericCallbackObject[]>
}

interface Handler { invoke: Function, unregister: Function }
interface HandlerMsgClass { invoke: Function, msgClass: Function }

interface SteamID {
	m_ulSteamID: {
		low: number,
		high: number,
		unsigned: boolean
	}
}

interface m_CMInterface {
	ClientServersAvailableHandler: Handler
	m_ServiceTransport: { SendMsg: Function, SendNotification: Function, MakeReady: Function }

	get m_bCompletedInitialConnect(): boolean
	get m_bConnected(): boolean
	m_bConnectionFailed: boolean
	m_bForceDisconnect: boolean
	get m_bLoggedOn(): boolean
	get m_bPerformedInitialClockAdjustment(): boolean
	m_bShouldChangePersonaStatusOnDisconnect: boolean

	m_callbacksOnConnect: GenericConnectCallbacks
	m_callbacksOnConnectOneTime: GenericConnectCallbacks
	m_callbacksOnDisconnect: GenericConnectCallbacks

	m_hEMsgRegistrationObserver: Function
	m_hSharedConnection: number

	m_messageHandlers: {
		m_mapCallbacks: Map<number, GenericCallbackObject[]>
		m_mapServiceMethodHandlers: Map<`${string}#1`, HandlerMsgClass>
	}

	get m_rgRegisteredEMsgs(): Proxy<number[]>
	get m_rgRegisteredServiceMethodHandlers(): Proxy<string[]>

	m_nPerfClockServerMSOffset: number
	m_nWallClockDriftMS: number

	m_onConnect: Promise<undefined>

	get m_rtReconnectThrottleExpiration(): number
	get m_rtReconnectThrottleStart(): number

	m_setConnectedServers: Set<number>
	m_setEMsgHandlers: Set<number>
	m_setServiceMethodHandlers: Set<string>

	m_steamid: SteamID

	get m_strIPCountry(): string
	get m_strPersonaName(): string
	get m_unAccountFlags(): number

	get OnConnectionAttemptThrottled(): Function
	get account_flags(): number
	get has_completed_initial_connect(): boolean
	get logged_on(): boolean
	get messageHandlers(): D
	get persona_name(): string
	get rtReconnectThrottleExpiration(): number
	get rtReconnectThrottleStart(): number
}

interface FriendsUIApp {
	m_CMInterface: m_CMInterface
	m_UIStore: m_UIStore
	m_Storage: {
		GetString: Function
		RemoveObject: Function
		StoreString: Function
	}
	[other: string]: any
}
interface m_UIStore {
	m_CMInterface: m_CMInterface
	m_FriendsListSteamDeckActiveTabCallbackList: Omit<GenericCallbackObject, "">[]
	m_bParentalLocked: boolean
	m_bRestoredPopupState: boolean
	m_bRestoringPopups: boolean
	get m_bShowWinterSaleUI(): boolean
	m_bShuttingDown: boolean
	m_bSuppressBrowserContextBroadcasting: boolean
	m_bTheaterMode: boolean

	// TODO: type chat store
	m_chatStore: any

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
