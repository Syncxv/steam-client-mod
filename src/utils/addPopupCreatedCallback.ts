import { TPopup } from '@src/types/global'
import { generateUuid } from './generateUuid'

export const addPopupCreatedCallback = (
	callback: (popup: TPopup) => void,
	opt: { runOnOpenedPopups: boolean } = { runOnOpenedPopups: false }
): (() => void) => {
	const newCallback = (popup: TPopup) => {
		try {
			callback(popup)
		} catch (e) {
			console.error('Error in popup created callback', e)
		}
	}
	newCallback.id = generateUuid('pop-up-callback')

	g_PopupManager.m_rgPopupCreatedCallbacks.push(newCallback)

	if (opt.runOnOpenedPopups) {
		for (let popup of g_PopupManager.m_mapPopups.values()) {
			newCallback(popup)
		}
	}

	return () => {
		g_PopupManager.m_rgPopupCreatedCallbacks = g_PopupManager.m_rgPopupCreatedCallbacks.filter(
			(cb) => cb.id !== newCallback.id
		)
	}
}
