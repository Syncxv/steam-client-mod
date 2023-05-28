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

import { ObservableMap } from 'mobx';

import { m_CMInterface } from '../global/friendsUiApp';
export interface ChatRoomEffectSetting {
	buttonToken: `#ChatRoomEffect_${string}`
	locToken: `#ChatRoomEffect_${string}`
	render: (effect: any) => React.ReactNode
	renderButton: () => React.ReactNode
	renderEffectIcon: () => React.ReactNode
	timeout: number
}

export interface ParseBBCodeOptions {
	bAnimate: boolean
	bUseLargeEmoticons: boolean
	// TODO: type chat
	chat: any
	key: string
	onAnimationEnd: () => void
	onAnimationStart: () => number
	onLoad: Function
	rtTimestamp: number
	unAccountIDSender: number
}

interface Accumulator {
	new(): { m_rctElements: React.ReactNode[] }
	AppendText(text: string): void
}

export interface ChatStore {
	m_CMInterface: m_CMInterface;

	m_ChatRoomBBCodeParser: {
		m_accumulatorType: Accumulator
		m_dictComponents: {
			[key: string]: React.ComponentClass
		}
		ParseBBCode: (bbcode: string) => React.ReactNode;
		// TODO: type chat
		Parse_BuildReactComponents: (codeOpt: { type: number, text: string }, chat: any) => React.ReactNode
	}
	m_ChatRoomEffectSettings: {
		[effect: string]: ChatRoomEffectSetting;
	}

	m_ChatRoomGroupDisplayPrefs: {
		// TODO: type settings store
		m_SettingsStore: any
		m_mapDisplayPrefs: ObservableMap
	}

	m_bReadyToRender: boolean
	get m_bReceivedChatGroupList(): boolean
	m_bSendActiveGroupsQueued: boolean
	m_bSendingActiveGroups: boolean

	m_fnOnReadyToRender?: Function

	// stores
	get CMInterface(): any
	get ChatRoomBBCodeParser(): any
	get ChatRoomEffectSettings(): any
	get ChatRoomGroupDisplayPrefs(): any
	get ClanChatRooms(): any
	get EmbedStore(): any
	get EmoticonStore(): any
	get FriendChatBBCodeParser(): any
	get FriendChatStore(): any
	get FriendStore(): any
	get GameInviteStore(): any
	get InviteStore(): any
	get NotificationBBCodeParser(): any
	get TextFilterStore(): any
	get VoiceChat(): any

	get chat_group_list_ready(): boolean
	get currentChatRoomGroups(): any[]

	// TODO: finish it
}



interface Chat {

}
