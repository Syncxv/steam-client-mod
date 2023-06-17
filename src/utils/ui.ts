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

import { findInTree } from "./findInTree";

export const createElement = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.firstChild!;
};
export const findInReactTree = (tree: any, filter: (_tree: typeof tree) => boolean) =>
    findInTree(tree, filter, {
        walkable: ["props", "children", "child", "sibling"]
    });

export const getReactInstance = (elem: any): any => {
    const key: any = Object.keys(elem).find(m => m.startsWith("__reactInternalInstance"));
    return elem[key];
};

const isElement = (obj: any) =>
    typeof obj === "object" &&
	obj.nodeType === 1 &&
	typeof obj.style === "object" &&
	typeof obj.ownerDocument === "object";

export const getOwnerInstnace = (node: any) => {
    for (let curr = getReactInstance(node); curr; curr = curr.return) {
        const owner = curr.stateNode;
        if (owner && !isElement(owner)) {
            return owner;
        }
    }

    return null;
};

export const insertCss = (css: string, _document = window.document) => {
    const id = Math.floor(Date.now() + Math.random() * 100000).toString();
    const style = createElement(`<style id="${id}"> ${css} </style>`);
    _document.head.appendChild(style);
    return id;
};
