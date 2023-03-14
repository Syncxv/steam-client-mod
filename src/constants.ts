import { isFriendsUI } from './util/isFriendsUi'

export enum AutoCompleteTypes {
	Command = 1,
	Emoji = 2
}

export const WEBPACK_CHUNK = isFriendsUI() ? 'webpackChunk_steam_friendsui' : 'webpackChunksteamui'
