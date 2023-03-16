import { useCallback, useState } from '@webpack/common'

interface InputProps {
	label?: string
	placeholder?: string
	value: string
	onChange: (value: string) => void
}

export const Input: React.FC<InputProps> = ({ label, value, placeholder, onChange }) => {
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
		<div
			style={{ width: 'fit-content', height: 'fit-content' }}
			className={`input ${isFocused ? 'input--focused' : ''}`}
		>
			{label && <label htmlFor={`input-${label}`}>{label}</label>}
			<input
				id={`input-${label}`}
				className="DialogInput DialogInputPlaceholder DialogTextInputBase Focusable"
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
		</div>
	)
}
