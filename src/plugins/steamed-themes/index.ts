import { definePlugin } from '@utils'
import { Settings } from './components/Settings'
import { React } from '@webpack/common'

export default definePlugin({
	name: 'Themes',
	description: 'Idk Man Themes eh',
	authors: [{ name: 'Aria', discordId: '0' }],
	version: '1.1.1',

	settingsComponent: {
		title: 'Themes',
		identifier: 'steamed-themes',
		content: () => React.createElement(Settings, { themes: Object.values(steamed.Themes.themes) })
	}
})
