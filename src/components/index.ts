import { find } from '@webpack'

export * from './Input'
export * from './Container'
export * from './DialogButton'

export let SwitchItem: any

export const initComponents = () => {
	SwitchItem = find((m) => m?.render?.toString().includes('ToggleField'))
}
