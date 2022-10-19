import { PluginDef } from '../../types';

export function definePlugin<P extends PluginDef>(p: P & Record<string, any>) {
    return p;
}
