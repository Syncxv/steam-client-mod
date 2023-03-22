import { addPopupCreatedCallback, Devs, definePlugin, insertCss } from '@utils'
import { findByCodeLazy } from '@webpack'
import css from './styles.css'
const ProfileThing = findByCodeLazy('GetCurrentGameRichPresence', 'PersonaStateInNonSteamGame')

export default definePlugin({
	name: 'Discord Theme',
	description: 'cool stuff',
	authors: [Devs.Aria],
	version: '1.1.1',
	type: 'friend',

	patches: [
		{
			// what the fuck is this													here
			match: /(this\.props\.tabSet\.tabCount>0&&.{1,600})(.{1,2}\.map\(\(.{1,600}\)\))\)\)/,
			replace:
				"$1[React.createElement('div', {className: 'container'}, ...$2), $self.renderProfile()]))"
		}
	],

	removeCallback: null as Function | null,

	ids: [] as string[],

	renderProfile() {
		return (
			<ProfileThing
				bCompactView={false}
				bDNDSet={false}
				bHasGamePrivacy={false}
				bHideSnooze={true}
				bIsSelf={true}
				bParenthesizeNicknames={false}
				className="labelHolder"
				persona={g_FriendsUIApp?.FriendStore?.self?.persona}
				eFriendRelationship={0}
				onContextMenu={(e) => console.log(e)}
			/>
		)
	},

	start() {
		this.removeCallback = addPopupCreatedCallback(
			(popup) => {
				if (popup.m_strName.startsWith('chat_')) {
					this.ids.push(insertCss(css, popup.window.document))
				}
			},
			{ runOnOpenedPopups: true }
		)
	},

	stop() {
		this.removeCallback && this.removeCallback()
		for (const popup of g_PopupManager.m_mapPopups.values()) {
			if (popup.m_strName.startsWith('chat_')) {
				for (const id of this.ids) {
					const style = popup.window.document.getElementById(id)
					if (style) style.remove()
				}
			}
		}
	}
})
