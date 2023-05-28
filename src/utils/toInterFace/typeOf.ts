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

export function typeOf(variable, seen = new WeakSet()) {
	const type = typeof variable;
	if (Array.isArray(variable)) {
		if (variable.length === 0) {
			return "any[]";
		}
		const differentTypes = [...new Set(variable.map(item => typeOf(item, seen)))];
		if (differentTypes.length === 1) {
			return `${differentTypes[0]}[]`;
		}

		return `(${differentTypes.join(" | ")})`;
	} else if (type === "object") {
		if (variable === null) {
			return "null";
		}
		// If we've seen this object before, return immediately to avoid infinite loop.
		if (seen.has(variable)) {
			return "any";
		}
		// Add this object to the seen set.
		seen.add(variable);
		if (variable._keysAtom != null) {
			return "ObservableMap";
		}

		// create an object type representation
		if (variable && type === "object") {
			const props = Object.keys(variable).map(key => {
				const propType = typeOf(variable[key], seen);
				if (Object.getOwnPropertyDescriptor(variable, key)?.get) {
					return `get ${key}(): ${propType}`;
				} else {
					return `${key}: ${propType}`;
				}
			});
			return `{${props.join(";")}}`;
		}
		return "any";
	}
	return type;
}
