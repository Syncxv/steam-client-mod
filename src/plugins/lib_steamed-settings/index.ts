import { addPopupCreatedCallback, definePlugin } from '@utils'
import { Devs } from '@utils/constants'
import { React, ReactDOM } from '@webpack/common'
import { DropThingy } from './components/SteamedDropThingy'
import css from './style.scss'
export default definePlugin({
	name: 'LibrarySettings',
	description: 'hi',
	authors: [Devs.Aria],
	version: '1.1.1',
	type: 'library',
	css,
	start() {
		addPopupCreatedCallback(
			(popup) => {
				if (!popup.m_strName.includes('SteamLibraryWindow')) return
				let container = popup.window.document.createElement('container-gang')
				popup.window.document.body.appendChild(container)

				ReactDOM.render(
					React.createElement('div', {}, React.createElement(DropThingy)),
					popup.window.document.querySelector('container-gang')
				)
			},
			{ runOnOpenedPopups: true }
		)
	}
})
