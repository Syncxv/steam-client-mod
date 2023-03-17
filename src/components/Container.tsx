export const Container: React.FC<
	{ children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>
> = ({ children, className, ...props }) => {
	return (
		<div
			className={`DialogToggleField _DialogInputContainer _DialogLayout ${className ?? ''}`}
			{...props}
		>
			{children}
		</div>
	)
}
