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

import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";


async function main() {
    const steamPath = process.argv[2];

    console.log("steamPath = ", steamPath);

    if (!steamPath) return console.error("no steam path provided");

    if (!existsSync(steamPath)) console.error("invalid steam path");

    const rootFiles = await fs.readdir(steamPath);
    if (!rootFiles.includes("steam.exe")) return console.error("invalid steam path");

    console.log("HI");

    const steamUi = path.join(steamPath, "steamui");

    let library = await fs.readFile(path.join(steamUi, "library.js"), "utf-8");

    if (!existsSync(path.join(steamUi, "lib-backup.js"))) {
        console.log("WRITING BACKUP");
        await fs.writeFile(path.join(steamUi, "lib-backup.js"), library, "utf-8");
    }
    const [_, cacheVar] = library.match(/,(.{1,2})={};function/);
    library = library.replace(/(r\.exports})((.{1,2})\..{1,2}=.{1,2})/, `$1$3.c=${cacheVar};$2`);

    library = library.replace(/(,.{1,2}={};function .{1,2}\(.\)\{)/, "$1console.log(arguments[0]);");

    await fs.writeFile(path.join(steamUi, "library.js"), library);

    console.log("DONE");


    return "cool";
}


main().catch(err => console.error(err));
