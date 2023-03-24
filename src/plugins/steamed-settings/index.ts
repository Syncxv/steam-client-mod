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
