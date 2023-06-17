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

import Patches from "patches";
console.log("Patches LIB :O ", Patches);

const main = async () => {
    // this is steams library.js file not ours. we patching this one
    let libCooleo = await (await fetch("./library.js")).text();

    const [_, cacheVar] = libCooleo.match(/,(.{1,2})={};function/);
    libCooleo = libCooleo.replace(/(r\.exports})((.{1,2})\..{1,2}=.{1,2})/, `$1$3.c=${cacheVar};$2`);

    for (const [key, patches] of Object.entries(Patches)) {
        console.log(patches);
        if (
            JSON.parse(localStorage.getItem("steamed_disabled_plugins") ?? "[]").includes(key) ||
			!patches
        )
            continue;
        for (const patch of patches) {
            libCooleo = libCooleo.replace(patch.match, patch.replace);
        }
    }

    window.libCooleo = libCooleo;

    const jsBlob = new Blob([libCooleo], { type: "text/javascript" });
    const jsUrl = URL.createObjectURL(jsBlob);

    const script = document.createElement("script");
    script.src = jsUrl;

    document.head.appendChild(script);
    const lib = await (await fetch("./lib-client.js")).text();
    window.eval(lib);
};

main();
