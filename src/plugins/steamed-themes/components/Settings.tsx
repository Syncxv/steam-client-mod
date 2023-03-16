import { Input } from '@components'
import { Theme } from '@src/types'
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

			{isOpen && (
				<div className="NewThemeCard">
					<Input label="Theme Name" value="" onChange={(e) => console.log(e)} />
					<Input label="Theme Author" value="" onChange={(e) => console.log(e)} />
					<Input label="Theme Description" value="" onChange={(e) => console.log(e)} />
				</div>
			)}
		</div>
	)
}
