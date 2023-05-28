/*
 * Steamed, a modification for the Steam Client
 * Copyright (c) 2023 Syncxv
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import type { WebpackInstance } from "@src/types";
import { proxyLazy } from "@utils/proxyLazy";

import { initCommon, initComponents } from "./common";
export type CallbackFn = (mod: any) => void;

export let wreq: WebpackInstance;
export let cache: WebpackInstance["c"];

export type FilterFn = (mod: any) => boolean;

export const filters = {
	byProps: (props: string[]): FilterFn =>
		props.length === 1
			? m => m[props[0]] !== void 0
			: m => props.every(p => m[p] !== void 0),
	byDisplayName:
		(deezNuts: string): FilterFn =>
			m =>
				m.default?.displayName === deezNuts,
	byCode:
		(...code: string[]): FilterFn =>
			m => {
				if (typeof m !== "function") return false;
				const s = Function.prototype.toString.call(m);
				for (const c of code) {
					if (!s.includes(c)) return false;
				}
				return true;
			},
};

export function _initWebpack(instance: typeof window.webpackChunkdiscord_app) {
	if (cache !== void 0) throw "no.";

	wreq = instance.push([[Symbol()], {}, (r: WebpackInstance) => r]);
	cache = wreq.c;
	instance.pop();

	initCommon();
	initComponents();
}

export function find(filter: FilterFn, getDefault = true) {
	if (typeof filter !== "function")
		throw new Error(
			"Invalid filter. Expected a function got " + typeof filter
		);

	for (const key in cache) {
		const mod = cache[key];
		if (!mod?.exports) continue;

		if (filter(mod.exports)) return mod.exports;

		if (typeof mod.exports !== "object") continue;

		if (mod.exports.default && filter(mod.exports.default))
			return getDefault ? mod.exports.default : mod.exports;

		// is 3 is the longest obfuscated export?
		// the length check makes search about 20% faster
		for (const nestedMod in mod.exports)
			if (nestedMod.length <= 3) {
				const nested = mod.exports[nestedMod];
				if (nested && filter(nested)) return nested;
			}
	}

	return null;
}

export function findAll(filter: FilterFn, getDefault = true) {
	if (typeof filter !== "function")
		throw new Error(
			"Invalid filter. Expected a function got " + typeof filter
		);

	const ret = [] as any[];
	for (const key in cache) {
		const mod = cache[key];
		if (!mod?.exports) continue;

		if (filter(mod.exports)) ret.push(mod.exports);
		else if (typeof mod.exports !== "object") continue;

		if (mod.exports.default && filter(mod.exports.default))
			ret.push(getDefault ? mod.exports.default : mod.exports);
		else
			for (const nestedMod in mod.exports)
				if (nestedMod.length <= 3) {
					const nested = mod.exports[nestedMod];
					if (nested && filter(nested)) ret.push(nested);
				}
	}

	return ret;
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
	const exports = {} as Record<S, any>;

	// search every factory function
	for (const id in wreq.m) {
		const src = (wreq.m[id] as any).toString() as string;
		if (src.includes(code)) {
			const mod = wreq(id as any as number);
			outer: for (const key in mod) {
				const member = mod[key];
				for (const newName in mappers) {
					// if the current mapper matches this module
					if (mappers[newName](member)) {
						exports[newName] = member;
						continue outer;
					}
				}
			}
			break;
		}
	}

	return exports;
}

export function findByProps(...props: string[]) {
	return find(filters.byProps(props));
}

/**
 * find but lazy
 */
export function findLazy(filter: FilterFn, getDefault = true) {
	return proxyLazy(() => find(filter, getDefault));
}

export function findAllByProps(...props: string[]) {
	return findAll(filters.byProps(props));
}
/**
 * findByProps but lazy
 */
export function findByPropsLazy(...props: string[]) {
	return findLazy(filters.byProps([...props]));
}

export function findByDisplayName(deezNuts: string) {
	return find(filters.byDisplayName(deezNuts));
}

/**
 * Find a function by its code
 */
export function findByCode(...code: string[]) {
	return find(filters.byCode(...code));
}

/**
 * findByCode but lazy
 */
export function findByCodeLazy(...code: string[]) {
	return findLazy(filters.byCode(...code));
}

export function waitFor(
	filter: string | string[] | FilterFn,
	callback: CallbackFn
) {
	if (typeof filter === "string") filter = filters.byProps([filter]);
	else if (Array.isArray(filter)) filter = filters.byProps(filter);
	else if (typeof filter !== "function")
		throw new Error(
			"filter must be a string, string[] or function, got " +
			typeof filter
		);

	const existing = find(filter!);
	if (existing) return void callback(existing);
	return null;
}
