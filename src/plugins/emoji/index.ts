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

import * as DataStore from '@api/DataStore';
import { definePlugin } from '@utils';
import { Devs } from '@utils/constants';
import { waitFor } from '@utils/waitFor';
import { React } from '@webpack/common';

import { isUrl } from '../../utils/isUrl';
import { emojiObj } from './emojiObjs';

const emojiKey = (name: string) => `EmojiStuff_emoji_${name}`;

export interface TEmoji {
	name: string;
	last_used: number;
	use_count: number;
	is_steamed: boolean;
}
export default definePlugin({
	name: 'EmojiStuff',
	description: 'this plugin adds unicode emoji gg ez',
	authors: [Devs.Aria],
	type: 'friend',
	patches: [
		{
			match: /(static GetEmoticonURL\(.{1,4}\){)/,
			replace: '$1console.log("hi", e, t);\n'
		},
		{
			match:
				/(GetEmoticonURL\(.{1,4}\);return.{1,4}\.createElement.{1,150})(.{1,2}\(\)\.createElement\("img".{1,250}\),)/,
			// match: /(GetEmoticonURL\(.{1,4}\);return.{1,4}\.createElement.{1,150})(.{1,2}\(\)\.createElement\("img",.{1,50}className:(\(.{1,50}\))).{1,250}\)\),/,
			replace: '$1emojiObj[this.props.emoticon] != null ? $self.renderEmoji(this)  : $2'
		},

		{
			match: /(OnEmoticonSuggestionSelected\(.{1,4}\){)/,
			replace: '$1if($self.onEmoticonSuggestionSelected(this, arguments[1])) return;'
		},
		// emoji picker (not autocomplete)
		{
			match: /(OnEmoticonSelected\(.{1,6}\){)/,
			replace:
				'$1if(emojiObj[arguments[0]]) {  return this.InsertAtCursor(emojiObj[arguments[0]].emoji) };'
		},
		{
			match: /(ReplaceSuggestedText\(.{1,20}\){.{1,350})&&(\(.{1,10}\))/,
			replace: '$1&&!arguments[3]&&$2'
		}
	],

	renderEmoji(_this: any) {
		const { emoji } = emojiObj[_this.props.emoticon];

		return React.createElement(
			'div',
			{ className: 'cool' },
			isUrl(emoji)
				? React.createElement('img', { src: emoji, style: { width: '1rem' } })
				: React.createElement('span', {}, emoji)
		);
	},

	onEmoticonSuggestionSelected(_this: any, emoji: string) {
		if (emoji && emojiObj[emoji]) {
			const obj: { emoji: string; name: string; } = emojiObj[emoji];
			_this.FocusTextInput();
			_this.ReplaceSuggestedText(':', obj.emoji, undefined, true);
			DataStore.get(emojiKey(obj.name)).then(async (data: TEmoji) => {
				const res =
					data != null
						? { ...data, last_used: Date.now(), use_count: data.use_count + 1 }
						: {
							name: obj.name,
							last_used: Date.now(),
							use_count: 1,
							is_steamed: true
						};
				await DataStore.set(emojiKey(obj.name), res);

				const bru = g_FriendsUIApp.ChatStore.EmoticonStore.m_rgEmoticons.find(
					(e: TEmoji) => e.name === obj.name
				);
				if (bru) {
					bru.last_used = res.last_used;
					bru.use_count = res.use_count;
				}

				g_FriendsUIApp.ChatStore.EmoticonStore.OnEmoticonListReceived(
					g_FriendsUIApp.ChatStore.EmoticonStore.m_rgEmoticons
				);
			});

			return true;
		}
		return false;
	},

	async start() {
		window.emojiObj = emojiObj;
		waitFor(
			() =>
				g_FriendsUIApp.ChatStore.EmoticonStore.BInitialized() &&
				g_FriendsUIApp.ChatStore.EmoticonStore.m_rgEmoticons.length,

			async () => {
				console.log('READY?', g_FriendsUIApp.ChatStore.EmoticonStore.m_rgEmoticons);

				const res = await Promise.all(
					Object.values(emojiObj).map(
						async e =>
							(await DataStore.get(emojiKey(e.name))) ?? {
								name: e.name,
								last_used: 1663606897,
								use_count: 1,
								is_steamed: true
							}
					)
				);

				g_FriendsUIApp.ChatStore.EmoticonStore.m_rgEmoticons =
					g_FriendsUIApp.ChatStore.EmoticonStore.m_rgEmoticons.concat(res);
			}
		);
	},

	stop() {
		g_FriendsUIApp.ChatStore.EmoticonStore.m_rgEmoticons =
			g_FriendsUIApp.ChatStore.EmoticonStore.m_rgEmoticons.filter((e: any) => !e.is_steamed);
	}
});
