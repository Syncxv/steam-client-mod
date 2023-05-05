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

import { Component, JSX, splitProps } from "solid-js";

import Styles from './Input.module.scss';
interface InputProps {
	title: string;
	description?: string;
	id?: string;
	webkitdirectory?: boolean;
}


export const Input: Component<InputProps & JSX.IntrinsicElements['input']> = props => {
	const [{ title, id, description }, rest] = splitProps(props, ["title", "id", "description"]);
	return (
		<div class={Styles.container}>
			<label for={id ?? title}>
				{title}
			</label>
			{description && <p>{description}</p>}
			<input {...rest} title={title} id={id ?? title} />
		</div>
	);
};
