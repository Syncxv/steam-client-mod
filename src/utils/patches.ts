export type ReplaceFn = (match: string, ...groups: string[]) => string

export function processPatch(replace: string | ReplaceFn, pluginName: string) {
	if (typeof replace === 'function' || !pluginName) return replace
	return pluginName.includes(' ')
		? replace.replaceAll('$self', `steamed.Plugins.plugins["${pluginName}"]`)
		: replace.replaceAll('$self', `steamed.Plugins.plugins.${pluginName}`)
}
