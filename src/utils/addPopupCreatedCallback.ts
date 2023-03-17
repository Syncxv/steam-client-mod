import { TPopup } from '@src/types/global'
import { generateUuid } from './generateUuid'

export const addPopupCreatedCallback = (callback: (popup: TPopup) => void): (() => void) => {
	const newCallback = (popup: TPopup) => {
		callback(popup)
	}
	newCallback.id = generateUuid('pop-up-callback')

	g_PopupManager.m_rgPopupCreatedCallbacks.push(newCallback)

	return () => {
		g_PopupManager.m_rgPopupCreatedCallbacks = g_PopupManager.m_rgPopupCreatedCallbacks.filter(
			(cb) => cb.id !== newCallback.id
		)
	}
}
