import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...rest }, ref) => {
    const inputId = id || rest.name;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-stone-700 mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-2.5 rounded-md border bg-white focus:ring-2 focus:outline-none transition-colors text-stone-800 placeholder:text-stone-400',
            error
              ? 'border-maroon-500 focus:border-maroon-500 focus:ring-maroon-200'
              : 'border-stone-300 focus:border-saffron-500 focus:ring-saffron-200',
            className,
          )}
          {...rest}
        />
        {error ? (
          <p className="mt-1 text-xs text-maroon-700">{error}</p>
        ) : hint ? (
          <p className="mt-1 text-xs text-stone-500">{hint}</p>
        ) : null}
      </div>
    );
  },
);
Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...rest }, ref) => {
    const inputId = id || rest.name;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-stone-700 mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-2.5 rounded-md border bg-white focus:ring-2 focus:outline-none transition-colors text-stone-800 placeholder:text-stone-400 resize-y min-h-[120px]',
            error
              ? 'border-maroon-500 focus:border-maroon-500 focus:ring-maroon-200'
              : 'border-stone-300 focus:border-saffron-500 focus:ring-saffron-200',
            className,
          )}
          {...rest}
        />
        {error ? (
          <p className="mt-1 text-xs text-maroon-700">{error}</p>
        ) : hint ? (
          <p className="mt-1 text-xs text-stone-500">{hint}</p>
        ) : null}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';
