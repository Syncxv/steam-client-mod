import type { WebpackInstance } from '@types'
import { initComponents } from '@components'
// import { initCommon } from '@webpack/common'
import { proxyLazy } from '@utils/proxyLazy'
import { initCommon } from './common'
// import { proxyLazy } from "../utils/proxyLazy";
export type CallbackFn = (mod: any) => void

export let wreq: WebpackInstance
export let cache: WebpackInstance['c']

export type FilterFn = (mod: any) => boolean

export const filters = {
	byProps: (props: string[]): FilterFn =>
		props.length === 1 ? (m) => m[props[0]] !== void 0 : (m) => props.every((p) => m[p] !== void 0),
	byDisplayName:
		(deezNuts: string): FilterFn =>
		(m) =>
			m.default?.displayName === deezNuts,
	byCode:
		(...code: string[]): FilterFn =>
		(m) => {
			if (typeof m !== 'function') return false
			const s = Function.prototype.toString.call(m)
			for (const c of code) {
				if (!s.includes(c)) return false
			}
			return true
		}
}

export function _initWebpack(instance: typeof window.webpackChunkdiscord_app) {
	if (cache !== void 0) throw 'no.'

	wreq = instance.push([[Symbol()], {}, (r: WebpackInstance) => r])
	cache = wreq.c
	instance.pop()

	initCommon()
	initComponents()
}

export function find(filter: FilterFn, getDefault = true) {
	if (typeof filter !== 'function')
		throw new Error('Invalid filter. Expected a function got ' + typeof filter)

	for (const key in cache) {
		const mod = cache[key]
		if (!mod?.exports) continue

		if (filter(mod.exports)) return mod.exports

		if (typeof mod.exports !== 'object') continue

		if (mod.exports.default && filter(mod.exports.default))
			return getDefault ? mod.exports.default : mod.exports

		// is 3 is the longest obfuscated export?
		// the length check makes search about 20% faster
		for (const nestedMod in mod.exports)
			if (nestedMod.length <= 3) {
				const nested = mod.exports[nestedMod]
				if (nested && filter(nested)) return nested
			}
	}

	return null
}

export function findAll(filter: FilterFn, getDefault = true) {
	if (typeof filter !== 'function')
		throw new Error('Invalid filter. Expected a function got ' + typeof filter)

	const ret = [] as any[]
	for (const key in cache) {
		const mod = cache[key]
		if (!mod?.exports) continue

		if (filter(mod.exports)) ret.push(mod.exports)
		else if (typeof mod.exports !== 'object') continue

		if (mod.exports.default && filter(mod.exports.default))
			ret.push(getDefault ? mod.exports.default : mod.exports)
		else
			for (const nestedMod in mod.exports)
				if (nestedMod.length <= 3) {
					const nested = mod.exports[nestedMod]
					if (nested && filter(nested)) ret.push(nested)
				}
	}

	return ret
}

/**
 * Finds a mangled module by the provided code "code" (must be unique and can be anywhere in the module)
 * then maps it into an easily usable module via the specified mappers
 * @param code Code snippet
 * @param mappers Mappers to create the non mangled exports
 * @returns Unmangled exports as specified in mappers
 *
 * @example mapMangledModule("headerIdIsManaged:", {
 *             openModal: filters.byCode("headerIdIsManaged:"),
 *             closeModal: filters.byCode("key==")
 *          })
 */
export function mapMangledModule<S extends string>(
	code: string,
	mappers: Record<S, FilterFn>
): Record<S, any> {
	const exports = {} as Record<S, any>

	// search every factory function
	for (const id in wreq.m) {
		const src = (wreq.m[id] as any).toString() as string
		if (src.includes(code)) {
			const mod = wreq(id as any as number)
			outer: for (const key in mod) {
				const member = mod[key]
				for (const newName in mappers) {
					// if the current mapper matches this module
					if (mappers[newName](member)) {
						exports[newName] = member
						continue outer
					}
				}
			}
			break
		}
	}

	return exports
}

export function findByProps(...props: string[]) {
	return find(filters.byProps(props))
}

/**
 * find but lazy
 */
export function findLazy(filter: FilterFn, getDefault = true) {
	return proxyLazy(() => find(filter, getDefault))
}

export function findAllByProps(...props: string[]) {
	return findAll(filters.byProps(props))
}
/**
 * findByProps but lazy
 */
export function findByPropsLazy(...props: string[]) {
	return findLazy(filters.byProps([...props]))
}

export function findByDisplayName(deezNuts: string) {
	return find(filters.byDisplayName(deezNuts))
}

export function waitFor(filter: string | string[] | FilterFn, callback: CallbackFn) {
	if (typeof filter === 'string') filter = filters.byProps([filter])
	else if (Array.isArray(filter)) filter = filters.byProps(filter)
	else if (typeof filter !== 'function')
		throw new Error('filter must be a string, string[] or function, got ' + typeof filter)

	const existing = find(filter!)
	if (existing) return void callback(existing)
	return null
}
/**
 * Search modules by keyword. This searches the factory methods,
 * meaning you can search all sorts of things, displayName, methodName, strings somewhere in the code, etc
 * @param filters One or more strings or regexes
 * @returns Mapping of found modules
 */
export function search(...filters: Array<string | RegExp>) {
	const results = {} as Record<number, Function>
	const factories = wreq.m
	outer: for (const id in factories) {
		const factory = factories[id].original ?? factories[id]
		const str: string = factory.toString()
		for (const filter of filters) {
			if (typeof filter === 'string' && !str.includes(filter)) continue outer
			if (filter instanceof RegExp && !filter.test(str)) continue outer
		}
		results[id as any] = factory
	}

	return results
}

/**
 * Extract a specific module by id into its own Source File. This has no effect on
 * the code, it is only useful to be able to look at a specific module without having
 * to view a massive file. extract then returns the extracted module so you can jump to it.
 * As mentioned above, note that this extracted module is not actually used,
 * so putting breakpoints or similar will have no effect.
 * @param id The id of the module to extract
 */
export function extract(id: number) {
	const mod = wreq.m[id] as Function
	if (!mod) return null

	const code = `
 // [EXTRACTED] WebpackModule${id}
 // WARNING: This module was extracted to be more easily readable.
 //          This module is NOT ACTUALLY USED! This means putting breakpoints will have NO EFFECT!!
 ${mod.toString()}
 //# sourceURL=ExtractedWebpackModule${id}
 `
	const extracted = (0, eval)(code)
	return extracted as Function
}
