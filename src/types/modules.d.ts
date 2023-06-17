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

declare module "plugins" {
	const plugins: Record<string, import(".").Plugin>;
	export default plugins;
}
declare module "patches" {
	const patches: Record<string, import(".").Patch>;
	export default patches;
}

declare module "themes" {
	const themes: Record<string, import(".").Theme>;
	export default themes;
}

declare module "*.css"
declare module "*.scss"
