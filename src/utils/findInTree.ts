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



export function findInTree(
    tree: any,
    filter: (arg: any) => boolean,
    { walkable, ignore }: { walkable?: any | null; ignore?: string[]; } = {
        walkable: null,
        ignore: []
    }
): any {
    if (!tree || typeof tree !== "object") {
        return null;
    }

    if (typeof filter === "string") {
        // eslint-disable-next-line no-prototype-builtins
        if (tree.hasOwnProperty(filter)) {
            return tree[filter];
        }

        return null;
    } else if (filter(tree)) {
        return tree;
    }

    let returnValue = null;

    if (Array.isArray(tree)) {
        for (const value of tree) {
            returnValue = findInTree(value, filter, {
                walkable,
                ignore
            });

            if (returnValue) {
                return returnValue;
            }
        }
    } else {
        const walkables = !walkable ? Object.keys(tree) : walkable;

        for (const key of walkables) {
            // eslint-disable-next-line no-prototype-builtins
            if (!tree.hasOwnProperty(key) || ignore?.includes(key)) {
                continue;
            }

            returnValue = findInTree(tree[key], filter, {
                walkable,
                ignore
            });

            if (returnValue) {
                return returnValue;
            }
        }
    }

    return returnValue;
}
