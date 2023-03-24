import { ItemDef } from '../types';

export function definePlugin<P extends ItemDef>(p: P & Record<string, any>) {
	return { ...p, started: false, styleIds: [] };
}
