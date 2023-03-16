import { Theme } from '@types'
import { useState } from '@webpack/common'

export const Settings: React.FC<{ themes: Theme[] }> = ({ themes }) => {
	//toggle state
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div>
			<button
				className="DialogButton _DialogLayout Secondary Focusable"
				onClick={() => setIsOpen((prev) => !prev)}
			>
				New Theme
			</button>

			{isOpen && <h1>hi</h1>}
		</div>
	)
}
