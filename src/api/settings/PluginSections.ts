import { React } from '@webpack/common'

export interface Section {
	title: string
	identifier: string
	content: any
}

export interface PluginSections {
	[key: string]: Section
}

export let sections: PluginSections = {}

export const registerSetting = (section: Section) => {
	if (sections[section.identifier]) {
		throw new Error(`Settings tab ${section.identifier} is already registered!`)
	}
	section.content = React.createElement(section.content)
	console.log(section)
	sections[section.identifier] = section
}

export const unregisterSetting = (id: string) => {
	if (sections[id]) {
		delete sections[id]
	}
}
