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

import { definePlugin } from "@utils";
import { Devs } from "@utils/constants";

export default definePlugin({
    name: "LIBRARY TESTT",
    description: "hi",
    authors: [Devs.Aria],
    type: "library",
    patches: [
        {
            match: /(Storing new config params)/,
            replace: "HEHHE HHA $1"
        }
    ],
    start() {
        console.log("this should only run in the library");
    }
});
