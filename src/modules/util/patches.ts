export type ReplaceFn = (match: string, ...groups: string[]) => string

export function processPatch(replace: string | ReplaceFn, pluginName: string) {
	if (typeof replace === 'function') return replace
	return pluginName.includes(' ')
		? replace.replaceAll('$self', `Vencord.Plugins.plugins[${pluginName}]`)
		: replace.replaceAll('$self', `Vencord.Plugins.plugins.${pluginName}`)
}
