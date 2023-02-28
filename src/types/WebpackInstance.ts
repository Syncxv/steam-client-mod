//https://github.com/Swishilicous/discord-types/blob/main/other/WebpackInstance.d.ts
export type whatMiniCssJ = { miniCss: Function; j: Function }
export default interface __webpack_require__ {
	(id: number): any
	E: Function
	F: { j: Function }
	O: Function & whatMiniCssJ
	a: Function
	amdD: Function
	amdO: unknown

	d: Function
	/**
	 * Loads chunks by their ID.
	 */
	e: (chunkId: number) => any
	f: whatMiniCssJ

	g: typeof globalThis & { [key: string]: any }
	l: Function

	m: { [id: number]: Function }

	n: Function
	nmd: Function
	o: Function
	p: string
	r: Function
	s: null

	t: Function
	u: Function
}
