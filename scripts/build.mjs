import esbuild from 'esbuild';

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
        entryPoints: ['src/FriendClient/index.ts'],
        outfile: 'dist/js/FriendClient.js',
    }),
    esbuild.build({
        ...commonOptions,
        entryPoints: ['src/LibraryClient/index.ts'],
        outfile: 'dist/js/LibraryClient.js',
    }),
]).catch((err) => {
    console.error('Build failed');
    console.error(err.message);
    // make ci fail
    if (!watch) process.exitCode = 1;
});
