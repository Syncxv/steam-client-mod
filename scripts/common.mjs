import { existsSync } from 'fs';
import { readdir } from 'fs/promises';

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
            const pluginDirs = ['plugins', 'userplugins'];
            let code = '';
            let plugins = '\n';
            let i = 0;
            for (const dir of pluginDirs) {
                console.log(dir, pluginDirs);
                if (!existsSync(`./src/FriendClient/${dir}`)) continue;
                const files = await readdir(`./src/FriendClient/${dir}`);
                for (const file of files) {
                    if (file === 'index.ts') {
                        continue;
                    }
                    const mod = `p${i}`;
                    code += `import ${mod} from "./${dir}/${file.replace(/.tsx?$/, '')}";\n`;
                    plugins += `[${mod}.name]:${mod},\n`;
                    i++;
                }
            }
            code += `export default {${plugins}};`;
            return {
                contents: code,
                resolveDir: './src/FriendClient',
            };
        });
    },
};
