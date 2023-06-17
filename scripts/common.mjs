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


import { transform } from "esbuild";
import { existsSync } from "fs";
import { readdir, readFile } from "fs/promises";
export const globPlugins = {
    name: "glob-plugins",
    setup: build => {
        build.onResolve({ filter: /^plugins$/ }, args => {
            return {
                namespace: "import-plugins",
                path: args.path
            };
        });

        build.onLoad({ filter: /^plugins$/, namespace: "import-plugins" }, async () => {
            const dir = "plugins";
            let code = "";
            let plugins = "\n";
            let i = 0;
            if (!existsSync(`./src/${dir}`))
                return {
                    contents: "export default {YA_DONE_GOOFED_THE_DIRECTORY: {}}",
                    resolveDir: "./src"
                };

            const files = await readdir(`./src/${dir}`);
            for (const file of files) {
                const realFile = getFile(file, dir);
                if (!realFile) continue;
                const mod = `p${i}`;
                code += `import ${mod} from "./${dir}/${realFile}";\n`;
                plugins += `[${mod}.name]:${mod},\n`;
                i++;
            }
            code += `export default {${plugins}};`;

            return {
                contents: code,
                resolveDir: "./src"
            };
        });
    }
};


// ill impove it later ong on me
export const globPatches = {
    name: "glob-patches",
    setup: build => {
        build.onResolve({ filter: /^patches$/ }, args => {
            return {
                namespace: "import-patches",
                path: args.path
            };
        });

        build.onLoad({ filter: /^patches$/, namespace: "import-patches" }, async () => {
            const dir = "plugins";
            let code = "";
            let patches = "\n";
            let i = 0;
            if (!existsSync(`./src/${dir}`))
                return {
                    contents: "export default {YA_DONE_GOOFED_THE_DIRECTORY: {}}",
                    resolveDir: "./src"
                };
            const files = await readdir(`./src/${dir}`);
            for (const file of files) {
                const mod = `p${i}`;
                code += `import ${mod} from "./${dir}/${file.replace(/.tsx?$/, "")}";\n`;
                patches += `[${mod}.name]:${mod}.patches,\n`;
                i++;
            }
            code += `export default {${patches}};`;

            return {
                contents: code,
                resolveDir: "./src"
            };
        });
    }
};

export const CSSMinifyPlugin = {
    name: "CSSMinifyPlugin",
    setup(build) {
        build.onLoad({ filter: /\.css$/ }, async args => {
            const f = await readFile(args.path);
            const css = await transform(f, { loader: "css", minify: true });
            return { loader: "text", contents: css.code };
        });
    }
};


function getFile(file, dir) {
    if (file === "index.ts") return false;
    let filePath = file.endsWith(".ts") || file.endsWith(".tsx") ? file : `${file}/index.ts`;
    if (!existsSync(`./src/${dir}/${filePath}`)) filePath += "x";

    return filePath;
}
