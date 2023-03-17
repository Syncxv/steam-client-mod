import { findByProps, findLazy } from '@webpack'
import { initReact } from './react'

export * from './react'
export * from './components'

export let i18n: any

export const MessageClass = findLazy((m) =>
	m?.prototype?.constructor.toString().includes('eErrorSendingObservable')
)

const _openPopout = findLazy(
	(m) => typeof m === 'function' && m.toString().match(/\(.{1,2}\.bHideMainWindowForPopouts/)
)

export const openPopout = (
	component: React.ReactNode,
	opts: { strTitle: string; popupWidth: number; popupHeight: number } = {
		strTitle: 'Steamed',
		popupWidth: 800,
		popupHeight: 600
	}
) => {
	return _openPopout(component, window, opts.strTitle, opts)
}

export const initCommon = () => {
	initReact()
	i18n = findByProps('LocalizeString')
}
