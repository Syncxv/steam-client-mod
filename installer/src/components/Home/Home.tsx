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

import { invoke } from "@tauri-apps/api";
import { Component, createResource, createSignal, Show } from "solid-js";

import { Button } from "../Button";
import { InputFilePicker } from "../Input/Input";
import Styles from './Home.module.scss';

interface Config {
	steam_path: string;
}

export const Home: Component = () => {
	const [configStr, _] = createSignal("");
	const [data] = createResource<Config, string>(configStr, async () => JSON.parse(await invoke<string>("get_config")));
	return (
		<Show when={!data.loading} fallback={<>Loading...</>}>
			<div class={Styles.container}>
				<h1>Steamed</h1>
				<InputFilePicker
					id="steam-path"
					title="Steam path"
					// description="eg. C:/Program Files (x86)/Steam"
					placeholder="example: C:/Program Files (x86)/Steam"
					type="file"
					value={data()!.steam_path}
				/>


				<div class={Styles.actions}>
					<Button onClick={async () => await invoke("patch", { patchType: "friend" })} class="hehe">
						Patch
					</Button>
				</div>
			</div>
		</Show>
	);
};
