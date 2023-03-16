import { definePlugin } from 'src/utils'
import { emojiObj } from './emojiObjs'
import { waitFor } from '../../utils/waitFor'

export default definePlugin({
	name: 'EmojiStuff',
	description: 'this plugin adds unicode emoji gg ez',
	authors: [{ name: 'Aria', discordId: '0' }],
	version: '1.1.1',
	patches: [
		{
			match: /(static GetEmoticonURL\(.{1,4}\){)/,
			replace: '$1console.log("hi", e, t);\n'
		},
		{
			match:
				/(GetEmoticonURL\(.{1,4}\);return.{1,4}\.createElement.{1,150})(.{1,2}\(\)\.createElement\("img".{1,250}\),)/,
			// match: /(GetEmoticonURL\(.{1,4}\);return.{1,4}\.createElement.{1,150})(.{1,2}\(\)\.createElement\("img",.{1,50}className:(\(.{1,50}\))).{1,250}\)\),/,
			replace:
				'$1emojiObj[this.props.emoticon] != null ?  steamed.Webpack.Common.React.createElement("div", {className:"cool"}, emojiObj[this.props.emoticon].emoji) : $2'
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

	onEmoticonSuggestionSelected(_this: any, emoji: string) {
		if (emoji && window.emojiObj[emoji]) {
			_this.FocusTextInput()
			_this.ReplaceSuggestedText(':', window.emojiObj[emoji].emoji, undefined, true)
			return true
		}
		return false
	},

	async start() {
		window.emojiObj = emojiObj
		waitFor(
			() =>
				g_FriendsUIApp.ChatStore.EmoticonStore.BInitialized() &&
				g_FriendsUIApp.ChatStore.EmoticonStore.m_rgEmoticons.length,

			() => {
				console.log('READY?', g_FriendsUIApp.ChatStore.EmoticonStore.m_rgEmoticons)
				g_FriendsUIApp.ChatStore.EmoticonStore.m_rgEmoticons =
					g_FriendsUIApp.ChatStore.EmoticonStore.m_rgEmoticons.concat(
						Object.values(emojiObj).map((e) => ({
							name: e.name,
							last_used: 1663606897,
							use_count: 1,
							is_steamed: true
						}))
					)
			}
		)
	},

	stop() {
		g_FriendsUIApp.ChatStore.EmoticonStore.m_rgEmoticons =
			g_FriendsUIApp.ChatStore.EmoticonStore.m_rgEmoticons.filter((e: any) => !e.is_steamed)
	}
})
