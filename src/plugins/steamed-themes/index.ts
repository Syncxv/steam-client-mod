import { addPopupCreatedCallback,definePlugin, Devs, insertCss } from '@utils';
import { React } from '@webpack/common';

import { Settings } from './components/Settings';
import css from './styles.scss';

export default definePlugin({
	name: 'Themes',
	description: 'Idk Man Themes eh',
	authors: [Devs.Aria],
	version: '1.1.1',
	type: 'all',
	settingsComponent: {
		title: 'Themes',
		identifier: 'steamed-themes',
		content: () => React.createElement(Settings)
	},

	removeCallback: null as Function | null,
	start() {
		this.removeCallback = addPopupCreatedCallback(popup => {
			if (popup.m_strName === 'Friends List Settings') {
				insertCss(css, popup.window.document);
			}
		});
	},

	stop() {
		this.removeCallback && this.removeCallback();
	}
});
