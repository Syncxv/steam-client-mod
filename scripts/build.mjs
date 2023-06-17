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

import autoprefixer from "autoprefixer";
import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import postcss from "postcss";

import { globPlugins, globThemes } from "./common.mjs";
const watch = process.argv.includes("--watch");

const commonPlugins = [globPlugins, globThemes];

const sass = sassPlugin({
    type: "css-text",
    async transform(source, resolveDir) {
        const { css } = await postcss([autoprefixer]).process(source);
        return css;
    },
});

/**
 * @type {esbuild.BuildOptions}
 */
const commonOptions = {
    format: "iife",
    platform: "browser",
    target: ["chrome85"],
    minify: false,
    sourcemap: "inline",
    logLevel: "info",
    bundle: true,
    // watch,
    // Define the banner that wraps the code with an IIFE
    banner: { js: "try {(function() {" },
    // Define the footer that closes the IIFE
    footer: { js: "})();} catch(e) {console.error(e)}" },
};

try {
    const res = Promise.all([
        esbuild.build({
            ...commonOptions,
            entryPoints: ["src/index.ts"],
            outfile: "dist/js/main.js",
            external: ["plugins"],
            plugins: [...commonPlugins, sass],
        }),
    ]);
} catch (err) {
    console.error("Build failed");
    console.error(err.message);
    // make ci fail
    if (!watch) process.exitCode = 1;
}

if (watch) res.forEach(b => b.watch());
