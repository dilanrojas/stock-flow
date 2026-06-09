import type { ButtonHTMLAttributes, ComponentType, ReactNode } from 'react';
import Button from './button';

interface SectionHeaderProps {
  title: string;
  description?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  actionDisabled?: boolean;
  icon?: ComponentType<{ size?: number; className?: string }>;
  actionButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

export default function SectionHeader({
  title,
  description,
  actionLabel,
  onAction,
  actionDisabled = false,
  actionButtonProps,
  icon: Icon,
}: SectionHeaderProps) {
  const hasAction = Boolean(actionLabel && onAction);

  return (
    <div className='flex flex-col gap-4 rounded-xl bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between'>
      <div className='space-y-2'>
        <h1 className='text-2xl font-semibold tracking-tight text-slate-900'>{title}</h1>
        {description ? (
          <p className='max-w-2xl text-sm leading-6 text-slate-500'>{description}</p>
        ) : null}
      </div>

      {hasAction ? (
        <Button
          type='button'
          onClick={onAction}
          disabled={actionDisabled}
          {...actionButtonProps}
        >
          {Icon && (
            <span>
              <Icon />
            </span>
          )}
          <span>{actionLabel}</span>
        </Button>
      ) : null}
    </div>
  );
}
