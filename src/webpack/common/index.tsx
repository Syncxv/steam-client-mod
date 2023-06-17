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

import { filters, find, findByProps } from "@webpack";

import { initReact } from "./react";

export * from "./components";
export * from "./react";

export let i18n: any;

export let MessageClass: any;

export let _openPopout: any;
export const openPopout = (
    component: React.ReactNode,
    opts: { strTitle: string; popupWidth: number; popupHeight: number } = {
        strTitle: "Steamed",
        popupWidth: 800,
        popupHeight: 600
    }
): { Close: () => void; Update: () => void } => {
    return typeof _openPopout.ShowElementAsModal === "function"
        ? _openPopout.ShowElementAsModal(component, window, opts.strTitle, opts)
        : _openPopout(component, window, opts.strTitle, opts);
};

export const initCommon = () => {
    initReact();
    i18n = findByProps("LocalizeString") ?? findByProps("Localize");
    if (!i18n.LocalizeString) {
        i18n.LocalizeString = i18n.Localize;
    }

    MessageClass = find(m => m?.prototype?.constructor.toString().includes("eErrorSendingObservable"));
    _openPopout = find(m =>
        filters.byProps(["ShowElementAsModal"])(m) ||
		(typeof m === "function" && m.toString().match(/\(.{1,2}\.bHideMainWindowForPopouts/)));
};
