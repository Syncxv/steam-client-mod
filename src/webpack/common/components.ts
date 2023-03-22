import * as t from './types'
import { find, findByCodeLazy } from '@webpack'
export const DropDown = findByCodeLazy('DropDownField') as t.DropDown
export let SwitchItem: any

export const initComponents = () => {
	SwitchItem = find((m) => m?.render?.toString().includes('ToggleField'))
}
