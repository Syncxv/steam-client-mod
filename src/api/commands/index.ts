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


import { Command } from "@src/types";

export const commands: { [key: string]: Command; } = {};

export const find = (cb: (c: Command) => boolean) =>
	Object.values(commands).find(cb);

export const registerCommand = (cmd: Command) => {
	if (commands[cmd.name]) throw Error(`Name ${cmd.name} already exists boy`);
	steamed.Webpack.Common.i18n.m_mapTokens.set(
		`SteamedSlashCommandDescription_${cmd.name}`,
		cmd.description
	);
	commands[cmd.name] = cmd;
};
export const unRegisterCommand = (name: string) => {
	let value;
	commands[name]
		? (delete commands[name],
		steamed.Webpack.Common.i18n.m_mapTokens.delete(
			`SteamedSlashCommandDescription_${name}`
		),
		(value = true))
		: (value = false);
	return value;
};

export const processCommand = (thisObj: any) => {
	if (!thisObj.state.messageInput.startsWith("/")) return;
	const message: string = thisObj.state.messageInput;
	const [cmd, ...cmdArgs] = message.slice(1).split(" ");
	console.log(cmd, cmdArgs, steamed.Webpack.Common.MessageClass);

	const command = find(c =>
		c.name.toLowerCase().includes(cmd.toLowerCase())
	);
	if (!command) return;

	let result;

	try {
		// ill figure out async later
		result = command.execute(cmdArgs, this);
	} catch (e: any) {
		result = {
			send: false,
			result: `An error occurred while executing the command: ${e.message}.\nCheck the console for more details.`,
		};

		console.error(
			"An error occurred while executing command %s: %o",
			command.name,
			e
		);
	}

	if (!result || !result.result) {
		return;
	}

	if (result.send) {
		thisObj.state.messageInput = result.result;
	} else {
		thisObj.state.messageInput = "";
		const msg = new steamed.Webpack.Common.MessageClass(
			-1,
			g_FriendsUIApp.m_CMInterface.GetServerRTime32(),
			result.result
		);
		// idk how to change avatar and stuff
		thisObj.props.chatView.chat.InternalAppendChatMsg(msg);
		thisObj.setState({ ...thisObj.state, messageInput: "" });
	}
};
