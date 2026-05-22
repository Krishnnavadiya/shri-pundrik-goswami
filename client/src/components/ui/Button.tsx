import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-saffron-700 hover:bg-saffron-800 text-white focus:ring-saffron-500 shadow-sm',
  secondary:
    'bg-white hover:bg-cream-100 text-saffron-800 border border-saffron-300 focus:ring-saffron-400',
  outline:
    'bg-transparent border-2 border-saffron-700 text-saffron-700 hover:bg-saffron-700 hover:text-white',
  gold: 'bg-gold-500 hover:bg-gold-600 text-white shadow-sm',
  ghost: 'bg-transparent hover:bg-cream-100 text-saffron-800',
  danger: 'bg-maroon-700 hover:bg-maroon-800 text-white',
};

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, children, ...rest }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  ),
);

Button.displayName = 'Button';
