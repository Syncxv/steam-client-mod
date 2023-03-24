import { addPopupCreatedCallback } from '@utils';

import * as steamed from './steamed';
window.steamed = steamed;

const addSteamedToPopups = () =>
	addPopupCreatedCallback(
		popup => {
			Object.defineProperty(popup.window, 'steamed', {
				get: () => window.steamed,
				configurable: true
			});
		},
		{ runOnOpenedPopups: true }
	);

steamed.init(addSteamedToPopups);
