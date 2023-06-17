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

import { definePlugin } from "@utils";
import { Devs } from "@utils/constants";

export default definePlugin({
    name: "CommandsExecutor",
    description: "this plugin patches the fuckinnnnn slash commands sheet",
    authors: [Devs.Aria],
    patches: [
        {
            match: /(OnSubmit\(e\){.{1,50},)(this\.props\.chatView)/,
            replace: "async $1\nconsole.log(e, this, this.state);await steamed.Api.Commands.processCommand(this);\n$2"
        },
        {
            match: /(.{1,2}\.bAvailableInChina.{1,25})return (.{1,2})\}/,
            replace: `$1
            return {...Object.values(steamed.Api.Commands.commands).map(c => ({...c, strDescriptionToken: \`#SteamedSlashCommandDescription_\${c.name}\`, bAvailableInChina: true })).reduce((prev, curr) => ({...prev, [\`/\${curr.name}\`]: curr}), {}), ...$2}}
            `
        }
    ],
    commands: [
        {
            name: "dot",
            description: "dot :)",
            execute: () => {
                return {
                    send: false,
                    result: "hey there "
                };
            }
        },
        {
            name: "shrug",
            description: "sends shrug bruh",
            execute: (args: string[]) => {
                return {
                    send: true,
                    result: "¯\\_(ツ)_/¯ " + args.join(" ")
                };
            }
        },
        {
            name: "sponge",
            description: "sponge",
            execute: () => {
                return {
                    send: true,
                    result:
						"https://images-ext-1.discordapp.net/external/5Pjp6qFuE_op_xmNhCAttY89xRxjF14qVJcd1LqnJEU/%3Fv%3D1/https/cdn.discordapp.com/emojis/758277232849977375.gif"
                };
            }
        },
        {
            name: "hi-there-async",
            description: "async command that sends hi there",
            execute: async () => {
                return {
                    send: true,
                    result: "hi there"
                };
            }
        }
    ]
});
