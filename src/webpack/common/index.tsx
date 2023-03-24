import { filters, findByProps, findLazy } from '@webpack';

import { initReact } from './react';

export * from './components';
export * from './react';

export let i18n: any;

export const MessageClass = findLazy(m =>
	m?.prototype?.constructor.toString().includes('eErrorSendingObservable')
);

export const _openPopout = findLazy(
	m =>
		filters.byProps(['ShowElementAsModal'])(m) ||
		(typeof m === 'function' && m.toString().match(/\(.{1,2}\.bHideMainWindowForPopouts/))
);

export const openPopout = (
	component: React.ReactNode,
	opts: { strTitle: string; popupWidth: number; popupHeight: number } = {
		strTitle: 'Steamed',
		popupWidth: 800,
		popupHeight: 600
	}
): { Close: () => void; Update: () => void } => {
	return typeof _openPopout.ShowElementAsModal === 'function'
		? _openPopout.ShowElementAsModal(component, window, opts.strTitle, opts)
		: _openPopout(component, window, opts.strTitle, opts);
};

export const initCommon = () => {
	initReact();
	i18n = findByProps('LocalizeString') ?? findByProps('Localize');
	if (!i18n.LocalizeString) {
		i18n.LocalizeString = i18n.Localize;
	}
};
