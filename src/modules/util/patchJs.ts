import { Patch } from '../../types';

export function patchJs(cooleo: string, Patches: { [key: string]: Patch[] }) {
    //expose cached webpack modules
    let [_, cacheVar] = cooleo.match(/,(.{1,2})={};function/)!;
    cooleo.replace(/(r\.exports})((.{1,2})\..{1,2}=.{1,2})/, `$1$3.c=${cacheVar};$2`);

    for (const [key, patches] of Object.entries(Patches)) {
        console.log(patches);
        if (JSON.parse(localStorage.getItem('steamed_disabled_plugins') ?? '[]').includes(key) || !patches) continue;
        for (const patch of patches) {
            cooleo = cooleo.replace(patch.match, patch.replace);
        }
    }
    return cooleo;
}
