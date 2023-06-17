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

import { React } from "@webpack/common";

export interface Section {
	title: string
	identifier: string
	content: any
}

export interface PluginSections {
	[key: string]: Section
}

export const sections: PluginSections = {};

export const registerSetting = (section: Section) => {
    if (sections[section.identifier]) {
        throw new Error(`Settings tab ${section.identifier} is already registered!`);
    }
    section.content = React.createElement(section.content);
    sections[section.identifier] = section;
};

export const unregisterSetting = (id: string) => {
    if (sections[id]) {
        delete sections[id];
    }
};
