import esbuild from 'esbuild';
import { globPlugins } from './common.mjs';

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
        plugins: [globPlugins],
    }),
    esbuild.build({
        ...commonOptions,
        entryPoints: ['src/iframe-injector/index.js'],
        outfile: 'dist/js/iframe-injector.js',
        external: ['plugins'],
        plugins: [globPlugins],
    }),
]).catch((err) => {
    console.error('Build failed');
    console.error(err.message);
    // make ci fail
    if (!watch) process.exitCode = 1;
});
