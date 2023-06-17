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

import { typeOf } from "./typeOf";

const varArr = [
    "e",
    "t",
    "r",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
];
const unwantedVarArr = [
    "constructor",
    "valueOf",
    "toString",
    "toLocaleString",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "hasOwnProperty",
    "__defineGetter__",
    "__defineSetter__",
    "__lookupGetter__",
    "__lookupSetter__",
    "__proto__",

    // already typed stuff
    "m_CMInterface",
    "CMInterface",
];
export function toJsonSafe(obj, seen = new WeakSet()) {
    if (typeof obj === "bigint") {
        return obj.toString();
    }

    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    if (seen.has(obj)) {
        return "[Circular]";
    }

    if (Array.isArray(obj)) {
        return typeOf(obj, seen);
    }

    seen.add(obj);

    const safeObj = {};
    const processProps = objectToProcess => {
        const keys = Object.getOwnPropertyNames(objectToProcess);
        for (const key of keys) {
            try {
                if (unwantedVarArr.includes(key)) {
                    continue;
                }
                const value = objectToProcess[key];

                const discriptor = Object.getOwnPropertyDescriptor(
                    objectToProcess,
                    key
                );
                if (discriptor?.get) {
                    safeObj[`removeThisMate123213${key}`] = `get ${key}(): ${typeOf(
                        value,
                        seen
                    )}`;
                }

                if (typeof value === "function") {
                    // if (value.length === 0) {
                    // 	let type

                    // 	try {
                    // 		type = typeOf(value.call(objectToProcess), seen);
                    // 	} catch (error) {
                    // 		console.error(`Error calling function "${key}": ${error}`)
                    // 	}
                    // 	if (type) {
                    // 		safeObj[key] = `() => ${type}`;
                    // 	} else {
                    // 		const bru = new Array(value.length).fill(undefined).map((_, i) => varArr[i] + ": any").join(', ');
                    // 		safeObj[key] = `(${bru}) => any`;
                    // 	}
                    // }
                    const bru = new Array(value.length)
                        .fill(undefined)
                        .map((_, i) => varArr[i] + ": any")
                        .join(", ");
                    safeObj[key] = `(${bru}) => any`;
                } else if (typeof value === "bigint") {
                    safeObj[key] = `${value.toString()}n`;
                } else if (typeof value === "string") {
                    safeObj[key] =
                        value.length === 0
                            ? "string"
                            : value.length > 1000
                                ? value.slice(0, 1000) + "..."
                                : value;
                } else if (!discriptor?.get) {
                    safeObj[key] = toJsonSafe(value, seen);
                }
            } catch (error) {
                console.error(`Error accessing property "${key}": ${error}`);
                safeObj[key] = "";
            }
        }
    };

    // Process own properties
    processProps(obj);

    // Process prototype properties
    const proto = Object.getPrototypeOf(obj);
    if (
        proto &&
        proto !== Object.prototype &&
        proto !== Set.prototype &&
        proto !== Map.prototype &&
        proto !== Promise.prototype &&
        !seen.has(proto)
    ) {
        console.log("proto = ", proto);
        processProps(proto);
    }

    return safeObj;
}
