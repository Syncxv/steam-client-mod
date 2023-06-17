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

import { capitalizeFirstLetter } from "./capital";
import { toJsonSafe } from "./toCoolObject";



let res = "";
const generatedInterfaces = new Set();
export function toInterface(obj, name = "MyInterface") {

    const safeObj = toJsonSafe(obj);

    if (safeObj == null || Object.keys(safeObj).length === 0) {
        return "";
    }

    const interfaceLines = Object.entries(safeObj).map(([key, value]) => {
        const propName = key.replace(/^removeThisMate123213/, "");

        // If value is an object representation, create a nested interface for it.
        let propType = value;
        if (typeof value === "object" && !Array.isArray(value)) {
            const nestedInterfaceName = `${capitalizeFirstLetter(key)}`;
            propType = nestedInterfaceName;

            if (!generatedInterfaces.has(nestedInterfaceName)) {
                generatedInterfaces.add(nestedInterfaceName);
                res += toInterface(value, nestedInterfaceName);
            }
        } else if (
            typeof value === "string" &&
			value.startsWith("{") &&
			value.endsWith("}")
        ) {
            // If value is a string representation of an object type, remove quotes around it.
            propType = value.slice(1, -1);
        }
        const shouldShowPropName = !(
            typeof propType === "string" && propType.startsWith("get ")
        );
        return `${shouldShowPropName ? propName + ": " : ""}${propType};`;
    });

    return (res += `\n\n\ninterface ${name} {\n    ${interfaceLines.join("\n    ")}\n}`);
}

export { capitalizeFirstLetter } from "./capital";
export { toJsonSafe } from "./toCoolObject";
export { typeOf } from "./typeOf";
// vscode search and repalce regexs

// removeThisMate123213.*: "(.+)"
// $1

// (.*): "(\{.+\}.+)"
// $1: $2
