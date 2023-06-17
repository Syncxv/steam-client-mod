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

import * as DataStore from "@api/DataStore";
import { Container, Input } from "@components";
import { Author } from "@src/types";
import { isUrl } from "@utils";
import { defineTheme } from "@utils/defineTheme";
import { useForceUpdater } from "@utils/misc";
import { DropDown, SwitchItem, useCallback, useState } from "@webpack/common";

import { DialogButton } from "../../../components/DialogButton";

export const Settings: React.FC = () => {
    const forceUpdate = useForceUpdater();
    const [isOpen, setIsOpen] = useState(false);
    const [errors, setErrors] = useState<string | null>(null);
    const [theme, setTheme] = useState({
        name: "",
        authors: [] as Author[],
        description: "",
        link: "",
        type: "friend" as "friend" | "library"
    });

    const handleThemeSubmit = useCallback(async (): Promise<void> => {
        console.log(theme);
        if (errors) {
            return;
        }
        if (steamed.Themes.themes[theme.name]) {
            setErrors("Theme already exists");
            return;
        }

        const cssData = await getCss(theme.link);
        if (cssData.error) {
            setErrors(cssData.error);
            return;
        }

        const themes = (await DataStore.get("Steamed_themes")) ?? [];
        await DataStore.set("Steamed_themes", [...themes, theme]);

        steamed.Themes.themes[theme.name] = defineTheme(theme);

        setIsOpen(false);
        forceUpdate();
    }, [theme]);

    return (
        <>
            <DialogButton variant="GreenPlay" onClick={() => setIsOpen(prev => !prev)}>
                {isOpen ? "Close" : "New Theme"}
            </DialogButton>

            {isOpen && (
                <Container className="NewThemeCard">
                    <Input
                        style={{ width: "100%" }}
                        label="Theme Name"
                        value={theme.name}
                        onChange={e => setTheme(prev => ({ ...prev, name: e }))}
                        error={steamed.Themes.themes[theme.name] ? "Theme already exists" : undefined}
                    />
                    {/* <Input
						style={{ width: '100%' }}
						label="Theme Authors"
						value={theme.authors.map((m) => m.name).join(',')}
						placeholder="Author1,Author2 (optional)"
						onChange={(e) =>
							setTheme((prev) => ({
								...prev,
								authors: (e as string).split(',').map((a) => ({ name: a }))
							}))
						}
					/> */}
                    <Input
                        style={{ width: "100%" }}
                        label="Theme Description"
                        value={theme.description}
                        onChange={e => setTheme(prev => ({ ...prev, description: e }))}
                    />

                    <Input
                        style={{ width: "100%" }}
                        label="Theme Link"
                        value={theme.link}
                        onChange={e => {
                            setTheme(prev => ({ ...prev, link: e }));
                            setErrors(null);
                        }}
                    />

                    <DropDown
                        label="Type"
                        rgOptions={[
                            { label: "Friend", data: "friend" },
                            { label: "Library", data: "library" }
                        ]}
                        strDefaultLabel="Friend"
                        selectedOption="friend"
                        onChange={val =>
                            setTheme(prev => ({ ...prev, type: val.data as "friend" | "library" }))
                        }
                    />

                    <DialogButton
                        disabled={
                            !!errors ||
							!!steamed.Themes.themes[theme.name] ||
							!(theme.name && theme.description && theme.link)
                        }
                        variant="Primary"
                        style={{ [errors ? "background" : ""]: "#e23232", [errors ? "color" : ""]: "white" }}
                        onClick={handleThemeSubmit}
                    >
                        {errors || "Create Theme"}
                    </DialogButton>
                </Container>
            )}
            <div style={{ marginTop: "1rem" }}>
                {Object.values(steamed.Themes.themes).map(theme => (
                    <SwitchItem
                        style={{ margin: "0" }}
                        label={theme.name}
                        description={theme.description}
                        onChange={(enable: boolean) =>
                            enable ? steamed.Themes.startTheme(theme) : steamed.Themes.stopTheme(theme)
                        }
                        checked={theme.started}
                    />
                ))}
            </div>
        </>
    );
};


async function getCss(url: string) {
    if (!isUrl(url)) return { error: "Invalid Link" };
    try {
        const res = await fetch(url);
        if (res.status > 300) return { error: `${res.status} ${res.statusText}` };
        const contentType = res.headers.get("Content-Type");
        if (!contentType?.startsWith("text/css") && !contentType?.startsWith("text/plain"))
            return { error: "Not a CSS file. Remember to use the raw link!" };

        return { data: await res.text() };
    } catch (e) {
        return { error: typeof e === "string" ? e : "Invalid Link" };
    }
}
