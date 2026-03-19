import { cn } from '@/lib/utils';

interface SpinnerProps extends React.ComponentProps<'div'> {
	size?: number;
	color?: string;
	disabled?: boolean;
}

export function Spinner({ size = 16, color = 'var(--alpha-light-400)', disabled, className, ...props }: SpinnerProps) {
	if (disabled) return null;

	const sizePx = `${size}px`;
	const barWidth = `${(size * 0.2).toFixed(2)}px`;
	const barHeight = `${(size * 0.075).toFixed(2)}px`;
	return (
		<div className={cn('relative', className)} style={{ width: sizePx, height: sizePx }} {...props}>
			{[...Array(5)].map((_, i) => (
				<div
					key={i}
					className="absolute inset-0 flex animate-spin justify-center"
					style={{
						animationDelay: `${i * 100}ms`,
					}}
				>
					<div
						style={{
							backgroundColor: color,
							width: barWidth,
							height: barHeight,
							borderRadius: '9999px',
						}}
					/>
				</div>
			))}
		</div>
	);
}
