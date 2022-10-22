import { ThemeDef } from '../../types';

export function defineTheme<P extends ThemeDef>(t: P & Record<string, any>) {
    return { ...t, styleIds: [] };
}
