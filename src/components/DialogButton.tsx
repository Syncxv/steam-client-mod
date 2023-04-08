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

type ValueOf<T> = T[keyof T]

type DialogButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	children: React.ReactNode
}

const DialogVriants = {
	Variant: {
		Primary: 'Primary',
		Secondary: 'Secondary',
		GreenPlay: 'GreenPlay'
	} as const
} as const;

type DialogButtonType = React.FC<
	DialogButtonProps &
		Partial<{
			variant: ValueOf<typeof DialogVriants.Variant>
		}>
>

export const DialogButton: DialogButtonType = ({
	children,
	className,
	variant = DialogVriants.Variant.Secondary,
	...props
}) => {
	return (
		<button
			className={`DialogButton _DialogLayout Focusable ${variant} ${className ?? ''}`}
			{...props}
		>
			{children}
		</button>
	);
};
