export const Settings: React.FC<{ settings: any }> = ({}) => (
	<form className="DialogBody">
		<p>WELCOME TO STEAMED</p>

		<p>nothing here at the moment :( no where near done developing steamed HEHEH HA</p>

		<div className="SettingsGroup">
			<steamed.Components.SwitchItem
				label="Is Cool?"
				description="jefwrg"
				onChange={(val: boolean) => {
					console.log(val)
					steamed.Settings.toggle('cool')
				}}
				checked={steamed.Settings.get('cool', true)}
			/>

			<button
				className="DialogButton _DialogLayout Secondary Focusable"
				onClick={() => window.reload()}
			>
				Reload Steamed
			</button>
		</div>
	</form>
)
