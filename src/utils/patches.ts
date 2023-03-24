export type ReplaceFn = (match: string, ...groups: string[]) => string

export function processPatch(replace: string | ReplaceFn, pluginName: string) {
	if (typeof replace === 'function' || !pluginName) return replace;
	return replace.replaceAll('$self', `steamed.Plugins.plugins["${pluginName}"]`);
}
