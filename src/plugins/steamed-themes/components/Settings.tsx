import { Container, Input, SwitchItem } from '@components'
import { DropDown, useState } from '@webpack/common'
import { DialogButton } from '../../../components/DialogButton'
import * as DataStore from '@api/DataStore'
import { PluginAuthor, Theme } from '@src/types'
import { defineTheme } from '@utils/defineTheme'
import { isUrl } from '@utils'

export const Settings: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [errors, setErrors] = useState<string | null>(null)
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
				{isOpen ? 'Close' : 'New Theme'}
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
					{/* <Input
						style={{ width: '100%' }}
						label="Theme Authors"
						value={theme.authors.map((m) => m.name).join(',')}
						placeholder="Author1,Author2 (optional)"
						onChange={(e) =>
							setTheme((prev) => ({
								...prev,
								authors: (e as string).split(',').map((a) => ({ name: a }))
							}))
						}
					/> */}
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
						onChange={(e) => {
							setTheme((prev) => ({ ...prev, link: e }))
							setErrors(null)
						}}
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
							!!errors ||
							!!steamed.Themes.themes[theme.name] ||
							!(theme.name && theme.description && theme.link)
						}
						variant="Primary"
						style={{ [errors ? 'background' : '']: '#e23232', [errors ? 'color' : '']: 'white' }}
						onClick={async () => {
							console.log(theme)
							if (errors) return
							if (steamed.Themes.themes[theme.name]) return setErrors('Theme already exists')

							const cssData = await getCss(theme.link)
							if (cssData.error) return setErrors(cssData.error)

							const themes = (await DataStore.get('Steamed_themes')) ?? []
							await DataStore.set('Steamed_themes', [...themes, theme])

							steamed.Themes.themes[theme.name] = defineTheme(theme)

							setIsOpen(false)
						}}
					>
						{errors ? errors : 'Create Theme'}
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

async function getCss(url: string) {
	if (!isUrl(url)) return { error: 'Invalid Link' }
	try {
		const res = await fetch(url)
		if (res.status > 300) throw `${res.status} ${res.statusText}`
		const contentType = res.headers.get('Content-Type')
		if (!contentType?.startsWith('text/css') && !contentType?.startsWith('text/plain'))
			throw 'Not a CSS file. Remember to use the raw link!'

		return { data: await res.text() }
	} catch (e) {
		return { error: typeof e === 'string' ? e : 'Invalid Link' }
	}
}
