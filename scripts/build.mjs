import autoprefixer from 'autoprefixer';
import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import postcss from 'postcss';

import { globPatches, globPlugins, globThemes } from './common.mjs';
const watch = process.argv.includes('--watch');

const commonPlugins = [globPlugins, globThemes];

const sass = sassPlugin({
    type: 'css-text',
    async transform(source, resolveDir) {
        const { css } = await postcss([autoprefixer]).process(source);
        return css;
    },
});

/**
 * @type {esbuild.BuildOptions}
 */
const commonOptions = {
    format: 'iife',
    platform: 'browser',
    target: ['chrome85'],
    minify: true,
    sourcemap: 'inline',
    logLevel: 'info',
    bundle: true,
    // watch,
    // Define the banner that wraps the code with an IIFE
    banner: { js: 'try {(function() {' },
    // Define the footer that closes the IIFE
    footer: { js: '})();} catch(e) {console.error(e)}' }
};

try {
    const res = Promise.all([
        esbuild.build({
            ...commonOptions,
            entryPoints: ['src/index.ts'],
            outfile: 'dist/js/FriendClient.js',
            external: ['plugins'],
            plugins: [...commonPlugins, sass],
        }),
        esbuild.build({
            ...commonOptions,
            entryPoints: ['src/index.ts'],
            outfile: 'dist/js/LibraryClient.js',
            external: ['plugins'],
            plugins: [...commonPlugins, sass],
        }),
        esbuild.build({
            ...commonOptions,
            entryPoints: ['src/js-patchers/iframe-patcher.js'],
            outfile: 'dist/js/iframe-patcher.js',
            external: ['patches'],
            plugins: [globPatches, sass],
            sourcemap: false
        }),
        esbuild.build({
            ...commonOptions,
            entryPoints: ['src/js-patchers/library-patcher.js'],
            outfile: 'dist/js/library-patcher.js',
            external: ['patches'],
            plugins: [globPatches, sass],
            sourcemap: false
        }),
    ]);
} catch (err) {
    console.error('Build failed');
    console.error(err.message);
    // make ci fail
    if (!watch) process.exitCode = 1;
}


if (watch) res.forEach(b => b.watch());
