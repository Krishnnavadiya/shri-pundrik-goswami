import { ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export const AdminPageHeader = ({ title, subtitle, action }: Props): JSX.Element => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
    <div>
      <h1 className="font-display text-2xl text-stone-900">{title}</h1>
      {subtitle && <p className="text-sm text-stone-500 mt-1">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);
