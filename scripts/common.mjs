import { transform } from 'esbuild';
import { existsSync } from 'fs';
import { readdir, readFile } from 'fs/promises';

export const globPlugins = {
    name: 'glob-plugins',
    setup: (build) => {
        build.onResolve({ filter: /^plugins$/ }, (args) => {
            return {
                namespace: 'import-plugins',
                path: args.path,
            };
        });

        build.onLoad({ filter: /^plugins$/, namespace: 'import-plugins' }, async () => {
            const dir = 'plugins';
            let code = '';
            let plugins = '\n';
            let i = 0;
            if (!existsSync(`./src/${dir}`)) return { contents: 'export default {YA_DONE_GOOFED_THE_DIRECTORY: {}}', resolveDir: './src' };

            const files = await readdir(`./src/${dir}`);
            for (const file of files) {
                if (
                    file === 'index.ts' ||
                    //if we are building friend client and the theme starts with lib then we can skip HEHEHHE HA
                    (build.initialOptions.outfile.endsWith('FriendClient.js') && file.startsWith('lib')) ||
                    (build.initialOptions.outfile.endsWith('LibraryClient.js') && !file.startsWith('lib'))
                ) {
                    continue;
                }
                const mod = `p${i}`;
                code += `import ${mod} from "./${dir}/${file.replace(/.tsx?$/, '')}";\n`;
                plugins += `[${mod}.name]:${mod},\n`;
                i++;
            }
            code += `export default {${plugins}};`;
            console.log(code, plugins);
            return {
                contents: code,
                resolveDir: './src',
            };
        });
    },
};

export const globThemes = {
    name: 'glob-themes',
    setup: (build) => {
        build.onResolve({ filter: /^themes$/ }, (args) => {
            console.log(build, args);
            return {
                namespace: 'import-themes',
                path: args.path,
            };
        });

        build.onLoad({ filter: /^themes$/, namespace: 'import-themes' }, async (e) => {
            const dir = 'themes';
            let code = '';
            let themes = '\n';
            let i = 0;
            if (!existsSync(`./src/${dir}`)) return { contents: 'export default {YA_DONE_GOOFED_THE_DIRECTORY: {}}', resolveDir: './src' };
            const files = await readdir(`./src/${dir}`);
            for (const file of files) {
                if (
                    file === 'index.ts' ||
                    //if we are building friend client and the theme starts with lib then we can skip HEHEHHE HA
                    (build.initialOptions.outfile.endsWith('FriendClient.js') && file.startsWith('lib')) ||
                    (build.initialOptions.outfile.endsWith('LibraryClient.js') && !file.startsWith('lib'))
                ) {
                    continue;
                }
                const them = `p${i}`;
                code += `import ${them} from "./${dir}/${file.replace(/.tsx?$/, '')}";\n`;
                themes += `[${them}.name]:${them},\n`;
                i++;
            }
            code += `export default {${themes}};`;
            console.log('THEMES: ', code, themes);
            return {
                contents: code,
                resolveDir: './src',
            };
        });
    },
};

//ill impove it later ong on me
export const globPatches = {
    name: 'glob-patches',
    setup: (build) => {
        build.onResolve({ filter: /^patches$/ }, (args) => {
            return {
                namespace: 'import-patches',
                path: args.path,
            };
        });

        build.onLoad({ filter: /^patches$/, namespace: 'import-patches' }, async () => {
            const dir = 'plugins';
            let code = '';
            let patches = '\n';
            let i = 0;
            if (!existsSync(`./src/${dir}`)) return { contents: 'export default {YA_DONE_GOOFED_THE_DIRECTORY: {}}', resolveDir: './src' };
            const files = await readdir(`./src/${dir}`);
            for (const file of files) {
                if (
                    file === 'index.ts' ||
                    //if we are building for friends or ifram patcher and the file starts with lib THEN we can skip this file as it will never be executed SINCE IT will only work on the friends
                    ((build.initialOptions.outfile.endsWith('FriendClient.js') || build.initialOptions.outfile.endsWith('iframe-patcher.js')) &&
                        file.startsWith('lib')) ||
                    ((build.initialOptions.outfile.endsWith('LibraryClient.js') || build.initialOptions.outfile.endsWith('library-patcher.js')) &&
                        !file.startsWith('lib'))
                ) {
                    continue;
                }
                const mod = `p${i}`;
                code += `import ${mod} from "./${dir}/${file.replace(/.tsx?$/, '')}";\n`;
                patches += `[${mod}.name]:${mod}.patches,\n`;
                i++;
            }
            code += `export default {${patches}};`;
            console.log(code);
            return {
                contents: code,
                resolveDir: './src',
            };
        });
    },
};

export const CSSMinifyPlugin = {
    name: 'CSSMinifyPlugin',
    setup(build) {
        build.onLoad({ filter: /\.css$/ }, async (args) => {
            const f = await readFile(args.path);
            const css = await transform(f, { loader: 'css', minify: true });
            return { loader: 'text', contents: css.code };
        });
    },
};
