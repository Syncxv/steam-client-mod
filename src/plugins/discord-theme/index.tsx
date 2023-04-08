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

import { addPopupCreatedCallback, definePlugin, Devs, insertCss } from '@utils';
import { findByCodeLazy } from '@webpack';

import css from './styles.scss';
const openSettings = findByCodeLazy('FriendSettings_Title');

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
		},

		{
			match: /(let .{1,3}=)(.{1,500}ShowCurrentUserProfile\()/,
			replace: '$1$self.ProfileThing = $2'
		}
	],

	removeCallback: null as Function | null,

	ids: [] as string[],

	renderProfile() {
		if (!this.ProfileThing) return null;
		return (
			<div className="profile-container">
				<this.ProfileThing
					bCompactView={false}
					bDNDSet={false}
					bHasGamePrivacy={false}
					bHideSnooze={true}
					bIsSelf={true}
					bParenthesizeNicknames={false}
					className="labelHolder"
					currentUser={g_FriendsUIApp?.FriendStore?.self}
					eFriendRelationship={0}
					onContextMenu={e => console.log(e)}
				/>
				<div
					onClick={() => openSettings({ m_unPID: 0, m_nBrowserID: -1, m_eUIMode: 0 }, window)}
					className="friendSettingsButton no-drag"
				>
					<svg
						version="1.1"
						id="Layer_1"
						xmlns="http://www.w3.org/2000/svg"
						className="SVGIcon_Button SVGIcon_Settings"
						x="0px"
						y="0px"
						width="256px"
						height="256px"
						viewBox="-305.5 396.5 256 256"
						enable-background="new -305.5 396.5 256 256"
					>
						<path
							d="M-232.755,589.942l3.103,2.408c5.78,4.492,11.973,8.18,18.409,10.959l3.581,1.547l2.276,33.783 c0.089,1.33,1.385,2.54,2.715,2.54h48.62c1.355,0,2.745-1.273,2.852-2.621l2.74-33.284l3.602-1.496 c6.406-2.656,12.646-6.262,18.554-10.707l3.137-2.366l30.578,15.009c1.155,0.571,2.924,0.017,3.563-1.087l24.303-42.1 c0.674-1.173,0.265-3.014-0.852-3.785l-27.872-19.309l0.469-3.832c0.495-4.032,0.725-7.395,0.725-10.57 c0-3.129-0.227-6.5-0.687-10.307l-0.469-3.896l28.699-19.253c1.112-0.741,1.509-2.473,0.84-3.627l-24.3-42.104 c-0.657-1.139-2.502-1.727-3.7-1.155l-31.208,14.748l-3.091-2.341c-5.571-4.224-11.466-7.688-17.522-10.306l-3.58-1.548 l-2.34-34.887c-0.089-1.33-1.381-2.536-2.715-2.536h-48.617c-1.355,0-2.74,1.274-2.851,2.626l-2.834,34.371l-3.593,1.501 c-6.082,2.535-12.028,5.924-17.667,10.071l-3.124,2.302l-31.392-15.413c-1.168-0.575-2.924-0.025-3.559,1.074l-24.309,42.107 c-0.678,1.172-0.264,3.014,0.848,3.781l28.068,19.444l-0.524,3.883c-0.592,4.378-0.865,8.018-0.865,11.462 c0,2.988,0.179,6.065,0.55,9.403l0.431,3.853l-28.528,19.125c-1.108,0.742-1.509,2.468-0.84,3.632l24.308,42.1 c0.656,1.142,2.489,1.726,3.7,1.154L-232.755,589.942z M-177.498,560.051c-19.311,0-35.02-15.709-35.02-35.02 s15.709-35.02,35.02-35.02s35.02,15.709,35.02,35.02S-158.188,560.051-177.498,560.051z"
							fill="currentColor"
						></path>
					</svg>
				</div>
			</div>
		);
	},

	start() {
		this.removeCallback = addPopupCreatedCallback(
			popup => {
				if (popup.m_strName.startsWith('chat_')) {
					this.ids.push(insertCss(css, popup.window.document));
				}
			},
			{ runOnOpenedPopups: true }
		);
	},

	stop() {
		this.removeCallback && this.removeCallback();
		for (const popup of g_PopupManager.m_mapPopups.values()) {
			if (popup.m_strName.startsWith('chat_')) {
				for (const id of this.ids) {
					const style = popup.window.document.getElementById(id);
					if (style) style.remove();
				}
			}
		}
	}
});
