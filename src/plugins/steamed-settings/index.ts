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

import { definePlugin } from '@utils';
import { Devs } from '@utils/constants';

import { Settings } from './components/SettingsView';

console.log(Settings);

export default definePlugin({
	name: 'Settings Patcher',
	description: 'this plugin patches the settings sidebar thingy and adds our own stuff to it',
	authors: [Devs.Aria],
	version: '1.1.1',
	type: 'friend',
	patches: [
		{
			match: /(FriendsUI ready to render after)/,
			replace: 'Steamed Gang for life $1'
		},
		{
			match: /("FriendSettingsContainer",pages:\[.{1,700})(\])/,
			replace: '$1,...Object.values(steamed.Api.Settings.PluginSections.sections)$2'
		}
	],
	settingsComponent: {
		title: 'General Settings',
		identifier: 'steamed-general-settings',
		content: Settings
	}
});
