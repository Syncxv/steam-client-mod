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

import { openPopout, React, useState } from "@webpack/common";

export const DropThingy: React.FC<{}> = ({}) => {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <div
                className={`steamedDrop ${isOpen ? "cool" : "not-cool"}`}
                onClick={() => setOpen(prev => !prev)}
            >
                <div className="cooldropdown">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="#ffffff"
                        viewBox="0 0 256 256"
                    >
                        <rect width="256" height="256" fill="none"></rect>
                        <polyline
                            points="48 160 128 80 208 160"
                            fill="none"
                            stroke="#ffffff"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="16"
                        ></polyline>
                    </svg>
                </div>
            </div>
            <div className={`contents ${isOpen ? "show" : "hide"}`}>
                <button
                    onClick={() =>
                        openPopout(React.createElement("div", {}, "hi"), {
                            strTitle: "hi",
                            popupWidth: 842,
                            popupHeight: 720
                        })
                    }
                    style={{ width: "200px" }}
                    className={"DialogButton _DialogLayout Secondary Focusable"}
                >
					Settings
                </button>
            </div>
        </>
    );
};
