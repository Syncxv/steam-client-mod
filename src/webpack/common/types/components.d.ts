type ValueOf<T> = T[keyof T]

export type DropDownData = { label: string; data: string }

export type DropDown = React.FC<{
	label: string
	rgOptions: DropDownData[]
	// the label of an element in rgOptions
	strDefaultLabel: string
	// the data of an element in rgOptions
	selectedOption: string
	onChange: (value: DropDownData) => void
}>
