import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
}

const sizeMap: Record<NonNullable<Props['size']>, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export const Modal = ({ open, onClose, title, size = 'lg', children }: Props): JSX.Element | null => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={cn('relative bg-white rounded-lg shadow-xl w-full overflow-hidden flex flex-col max-h-[90vh]', sizeMap[size])}>
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-200 shrink-0">
          <h2 className="font-display text-lg text-stone-900">{title}</h2>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
