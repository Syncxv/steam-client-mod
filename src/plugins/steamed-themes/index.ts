import { definePlugin, insertCss } from '@utils'
import { Settings } from './components/Settings'
import { React } from '@webpack/common'
import { Devs } from '@utils/constants'

import css from './styles.scss'
import { addPopupCreatedCallback } from '@utils/addPopupCreatedCallback'

export default definePlugin({
	name: 'Themes',
	description: 'Idk Man Themes eh',
	authors: [Devs.Aria],
	version: '1.1.1',
	settingsComponent: {
		title: 'Themes',
		identifier: 'steamed-themes',
		content: () => React.createElement(Settings)
	},

	removeCallback: null as Function | null,
	start() {
		this.removeCallback = addPopupCreatedCallback((popup) => {
			if (popup.m_strName === 'Friends List Settings') {
				insertCss(css, popup.window.document)
			}
		})
	},

	stop() {
		this.removeCallback && this.removeCallback()
	}
})
