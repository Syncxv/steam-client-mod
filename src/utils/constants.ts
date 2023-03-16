import { isFriendsUI } from '@utils/isFriendsUi'

export enum AutoCompleteTypes {
	Command = 1,
	Emoji = 2
}

export const WEBPACK_CHUNK = isFriendsUI() ? 'webpackChunk_steam_friendsui' : 'webpackChunksteamui'

export const Devs = Object.freeze({
	Aria: {
		name: 'Syncxv',
		id: 549244932213309442
	}
})
