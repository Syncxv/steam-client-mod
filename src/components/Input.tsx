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

import { useCallback, useState } from "@webpack/common";

type InputProps = React.HTMLAttributes<HTMLInputElement> & {
	label?: string
	placeholder?: string
	value: string
	onChange: (value: string) => void
	error?: string
}

export const Input: React.FC<InputProps> = ({
    label,
    value,
    placeholder,
    className,
    error,
    onChange,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
        setIsFocused(false);
    }, []);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.value);
        },
        [onChange]
    );

    return (
        <div className={`input ${isFocused ? "input--focused" : ""}`}>
            {label && <label htmlFor={`input-${label}`}>{label}</label>}
            <input
                id={`input-${label}`}
                className={`DialogInput DialogInputPlaceholder DialogTextInputBase Focusable ${
                    className ?? ""
                }`}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...props}
            />
            {error && (
                <span style={{ color: "red" }} className="input__error">
                    {error}
                </span>
            )}
        </div>
    );
};
