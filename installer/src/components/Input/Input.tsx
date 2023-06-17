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

import { dialog } from "@tauri-apps/api";
import { Component, createSignal, JSX, splitProps } from "solid-js";

import { Button } from "../Button";
import Styles from "./Input.module.scss";
interface InputProps {
	title: string;
	type?: string
	description?: string;
	webkitdirectory?: boolean;
}



export const InputFilePicker: Component<InputProps & JSX.IntrinsicElements["input"]> = props => {
    const [{ title, id, description, type }, rest] = splitProps(props, ["title", "id", "description", "type"]);
    const [value, setValue] = createSignal(props.value ?? "");

    const openDialog = async () => {
        const path = await dialog.open({
            directory: true
        });

        setValue(path ?? "");
    };

    const inputId = (id ?? title) + Math.random() * 1000000;
    return (
        <div class={Styles.container}>
            <label for={inputId}>
                {title}
            </label>
            {description && <p>{description}</p>}
            <div class={Styles.inputContainer}>
                <input {...rest} value={value()} type="text" title={title} id={inputId} />
                <Button onclick={openDialog} class={Styles.browse} type="button">Browse</Button>
            </div>
        </div>
    );
};

export const Input: Component<InputProps & JSX.IntrinsicElements["input"]> = props => {
    const [{ title, id, description, type }, rest] = splitProps(props, ["title", "id", "description", "type"]);

    return (
        <div class={Styles.container}>
            <label for={id ?? title}>
                {title}
            </label>
            {description && <p>{description}</p>}
            <div class={Styles.inputContainer}>
                <input {...rest} type={type} title={title} id={id ?? title} />
            </div>
        </div>
    );
};
