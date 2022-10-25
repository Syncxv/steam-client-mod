import esbuild from 'esbuild';
import { globPatches, globPlugins, globThemes } from './common.mjs';
import { sassPlugin } from 'esbuild-sass-plugin';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
const watch = process.argv.includes('--watch');

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
    watch,
};

Promise.all([
    esbuild.build({
        ...commonOptions,
        entryPoints: ['src/index.ts'],
        outfile: 'dist/js/FriendClient.js',
        external: ['plugins'],
        plugins: [
            globPlugins,
            globThemes,
            sassPlugin({
                type: 'css-text',
                async transform(source, resolveDir) {
                    const { css } = await postcss([autoprefixer]).process(source);
                    return css;
                },
            }),
        ],
    }),
    esbuild.build({
        ...commonOptions,
        entryPoints: ['src/index.ts'],
        outfile: 'dist/js/LibraryClient.js',
        external: ['plugins'],
        plugins: [
            globPlugins,
            globThemes,
            sassPlugin({
                type: 'css-text',
                async transform(source, resolveDir) {
                    const { css } = await postcss([autoprefixer]).process(source);
                    return css;
                },
            }),
        ],
    }),
    esbuild.build({
        ...commonOptions,
        entryPoints: ['src/js-patchers/iframe-patcher.js'],
        outfile: 'dist/js/iframe-patcher.js',
        external: ['patches'],
        plugins: [
            globPatches,
            sassPlugin({
                type: 'css-text',
                async transform(source, resolveDir) {
                    const { css } = await postcss([autoprefixer]).process(source);
                    return css;
                },
            }),
        ],
    }),
    esbuild.build({
        ...commonOptions,
        entryPoints: ['src/js-patchers/library-patcher.js'],
        outfile: 'dist/js/library-patcher.js',
        external: ['patches'],
        plugins: [
            globPatches,
            sassPlugin({
                type: 'css-text',
                async transform(source, resolveDir) {
                    const { css } = await postcss([autoprefixer]).process(source);
                    return css;
                },
            }),
        ],
    }),
]).catch((err) => {
    console.error('Build failed');
    console.error(err.message);
    // make ci fail
    if (!watch) process.exitCode = 1;
});
