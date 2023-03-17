import { useCallback, useState } from '@webpack/common'

type InputProps = React.HTMLAttributes<HTMLInputElement> & {
	label?: string
	placeholder?: string
	value: string
	onChange: (value: string) => void
}

export const Input: React.FC<InputProps> = ({
	label,
	value,
	placeholder,
	className,
	onChange,
	...props
}) => {
	const [isFocused, setIsFocused] = useState(false)

	const handleFocus = useCallback(() => {
		setIsFocused(true)
	}, [])

	const handleBlur = useCallback(() => {
		setIsFocused(false)
	}, [])

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			onChange(event.target.value)
		},
		[onChange]
	)

	return (
		<div className={`input ${isFocused ? 'input--focused' : ''}`}>
			{label && <label htmlFor={`input-${label}`}>{label}</label>}
			<input
				id={`input-${label}`}
				className={`DialogInput DialogInputPlaceholder DialogTextInputBase Focusable ${
					className ?? ''
				}`}
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				{...props}
			/>
		</div>
	)
}
