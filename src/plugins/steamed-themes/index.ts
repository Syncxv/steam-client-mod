import { definePlugin } from '@utils'
import { Settings } from './components/Settings'
import { React } from '@webpack/common'
import { Devs } from '@utils/constants'

import css from './styles.scss'

export default definePlugin({
	name: 'Themes',
	description: 'Idk Man Themes eh',
	authors: [Devs.Aria],
	version: '1.1.1',
	css,
	settingsComponent: {
		title: 'Themes',
		identifier: 'steamed-themes',
		content: () => React.createElement(Settings, { themes: Object.values(steamed.Themes.themes) })
	},

	start() {}
})
