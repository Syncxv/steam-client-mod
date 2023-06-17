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

import { Plugin } from "@src/types";
import { SwitchItem } from "@webpack/common";

export const Settings: React.FC = () => {
    return (
        <ul
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                listStyle: "none",
                padding: "1rem"
            }}
        >
            {Object.values(steamed.Plugins.plugins).map((plugin, i) => (
                <li>
                    <Plugin key={i} plugin={plugin} />
                </li>
            ))}
        </ul>
    );
};

const Plugin: React.FC<{ plugin: Plugin }> = ({ plugin }) => {
    return (
        <SwitchItem
            style={{ margin: "0" }}
            label={plugin.name}
            description={plugin.description}
            onChange={(enable: boolean) =>
                enable ? steamed.Plugins.startPlugin(plugin) : steamed.Plugins.stopPlugin(plugin)
            }
            checked={plugin.started}
        />
    );
};
