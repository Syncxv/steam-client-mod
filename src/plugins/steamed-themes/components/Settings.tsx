import { Container, Input, SwitchItem } from '@components'
import { DropDown, useState } from '@webpack/common'
import { DialogButton } from '../../../components/DialogButton'
import * as DataStore from '@api/DataStore'
import { PluginAuthor, Theme } from '@src/types'
import { defineTheme } from '@utils/defineTheme'

export const Settings: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [theme, setTheme] = useState({
		name: '',
		authors: [] as PluginAuthor[],
		description: '',
		link: '',
		type: 'friend' as 'friend' | 'library'
	})

	return (
		<div>
			<button
				className="DialogButton _DialogLayout Secondary Focusable"
				onClick={() => setIsOpen((prev) => !prev)}
			>
				New Theme
			</button>

			{isOpen && (
				<Container className="NewThemeCard">
					<Input
						style={{ width: '100%' }}
						label="Theme Name"
						value={theme.name}
						onChange={(e) => setTheme((prev) => ({ ...prev, name: e }))}
						error={steamed.Themes.themes[theme.name] ? 'Theme already exists' : undefined}
					/>
					<Input
						style={{ width: '100%' }}
						label="Theme Authors"
						value={theme.authors.map((m) => m.name).join(',')}
						placeholder="Author1,Author2,Author3"
						onChange={(e) =>
							setTheme((prev) => ({
								...prev,
								authors: (e as string).split(',').map((a) => ({ name: a }))
							}))
						}
					/>
					<Input
						style={{ width: '100%' }}
						label="Theme Description"
						value={theme.description}
						onChange={(e) => setTheme((prev) => ({ ...prev, description: e }))}
					/>

					<Input
						style={{ width: '100%' }}
						label="Theme Link"
						value={theme.link}
						onChange={(e) => setTheme((prev) => ({ ...prev, link: e }))}
					/>

					<DropDown
						label="Type"
						rgOptions={[
							{ label: 'Friend', data: 'friend' },
							{ label: 'Library', data: 'library' }
						]}
						strDefaultLabel="Friend"
						selectedOption="friend"
						onChange={(val) =>
							setTheme((prev) => ({ ...prev, type: val.data as 'friend' | 'library' }))
						}
					/>

					<DialogButton
						disabled={
							!!steamed.Themes.themes[theme.name] ||
							!(theme.name && theme.authors.length && theme.description && theme.link)
						}
						variant="Primary"
						onClick={async () => {
							console.log(theme)
							if (steamed.Themes.themes[theme.name]) {
								console.log('Theme already exists')
								return
							}
							const themes = (await DataStore.get('Steamed_themes')) ?? []
							await DataStore.set('Steamed_themes', [...themes, theme])

							steamed.Themes.themes[theme.name] = defineTheme(theme)

							setIsOpen(false)
						}}
					>
						Create Theme
					</DialogButton>
				</Container>
			)}
			{Object.values(steamed.Themes.themes).map((theme) => (
				<Theme theme={theme} />
			))}
		</div>
	)
}

const Theme: React.FC<{ theme: Theme }> = ({ theme }) => {
	return (
		<SwitchItem
			label={theme.name}
			description={theme.description}
			onChange={(enable: boolean) =>
				enable ? steamed.Themes.startTheme(theme) : steamed.Themes.stopTheme(theme)
			}
			checked={theme.started}
		/>
	)
}
