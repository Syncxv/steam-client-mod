import { findInTree } from './findInTree'

export const createElement = (html: string) => {
	const div = document.createElement('div')
	div.innerHTML = html
	return div.firstChild!
}
export const findInReactTree = (tree: any, filter: (_tree: typeof tree) => boolean) =>
	findInTree(tree, filter, {
		walkable: ['props', 'children', 'child', 'sibling']
	})

export const getReactInstance = (elem: any): any => {
	const key: any = Object.keys(elem).find((m) => m.startsWith('__reactInternalInstance'))
	return elem[key]
}

let isElement = (obj: any) =>
	typeof obj === 'object' &&
	obj.nodeType === 1 &&
	typeof obj.style === 'object' &&
	typeof obj.ownerDocument === 'object'

export const getOwnerInstnace = (node: any) => {
	for (let curr = getReactInstance(node); curr; curr = curr.return) {
		const owner = curr.stateNode
		if (owner && !isElement(owner)) {
			return owner
		}
	}

	return null
}

export const insertCss = (css: string, _document = window.document) => {
	let id = Math.floor(Date.now() + Math.random() * 100000).toString()
	const style = createElement(`<style id="${id}"> ${css} </style>`)
	_document.head.appendChild(style)
	return id
}
