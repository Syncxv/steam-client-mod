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
