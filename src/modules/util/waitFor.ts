import { sleep } from './sleep'

export const waitFor = async (querySelector: string, _document = window.document) => {
	let elem

	while (!(elem = _document.querySelector(querySelector))) {
		await sleep(1)
	}

	return elem
}
