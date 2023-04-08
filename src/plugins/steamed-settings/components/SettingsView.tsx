/*
 * Steamed, a modification for the Steam Client
 * Copyright (c) 2023 Syncxv
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { SwitchItem } from '@webpack/common';

export const Settings: React.FC<{ settings: any }> = ({}) => (
	<form className="DialogBody">
		<p>WELCOME TO STEAMED</p>

		<p>nothing here at the moment :( no where near done developing steamed HEHEH HA</p>

		<div className="SettingsGroup">
			<SwitchItem
				label="Is Cool?"
				description="jefwrg"
				onChange={(val: boolean) => {
					console.log(val);
					steamed.Settings.toggle('cool');
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
);
