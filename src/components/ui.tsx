'use client';

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Loader2, ArrowUp, ArrowDown, X, FolderKanban } from 'lucide-react';
import Link from 'next/link';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  className,
  href,
  ...props
}: ButtonProps): JSX.Element {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variantClasses = {
    primary: 'bg-zinc-900 text-white hover:bg-zinc-700 focus:ring-zinc-900',
    secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus:ring-zinc-900 border border-zinc-200',
    outline: 'border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 focus:ring-zinc-900',
    ghost: 'text-zinc-700 hover:bg-zinc-100 focus:ring-zinc-900',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  const content = (
    <>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </>
  );

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    (loading || disabled) && 'opacity-70 pointer-events-none',
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={loading || disabled}
      {...props}
    >
      {content}
    </button>
  );
}

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps): JSX.Element {
  return (
    <div className={cn('bg-white border border-zinc-200 rounded-xl shadow-sm', className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardProps): JSX.Element {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children }: CardProps): JSX.Element {
  return (
    <h3 className={cn('font-bold text-lg text-zinc-900 tracking-tight', className)}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children }: CardProps): JSX.Element {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps): JSX.Element {
  const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';
  const variantClasses = {
    default: 'bg-zinc-100 text-zinc-800',
    success: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-600 border border-amber-200',
    error: 'bg-red-50 text-red-600 border border-red-200',
    info: 'bg-blue-50 text-blue-600 border border-blue-200',
    purple: 'bg-purple-50 text-purple-600 border border-purple-200',
  };
  return (
    <span className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </span>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function Input({ label, error, icon, type = 'text', className, ...props }: InputProps): JSX.Element {
  return (
    <div className={cn('grid w-full items-center gap-1.5', className)}>
      {label && (
        <label htmlFor={props.id} className="text-sm font-medium text-zinc-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {React.isValidElement(icon) ? React.cloneElement(icon, { className: 'h-4 w-4 text-zinc-400' }) : icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus-visible:ring-red-500',
            icon && 'pl-10'
          )}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}

export function Spinner({ className }: { className?: string }): JSX.Element {
  return (
    <Loader2 className={cn('h-5 w-5 animate-spin text-zinc-500', className)} />
  );
}

interface AvatarProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ name, size = 'md', className }: AvatarProps): JSX.Element {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  const getBackgroundColor = (name: string): string => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500',
      'bg-red-500', 'bg-yellow-500', 'bg-indigo-500',
    ];
    const hash = name.charCodeAt(0) % colors.length;
    return colors[hash];
  };

  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  };

  return (
    <div className={cn(
      'relative flex items-center justify-center rounded-full text-white font-medium',
      getBackgroundColor(name),
      sizeClasses[size],
      className
    )}>
      {initials}
    </div>
  );
}

interface SparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export function Sparkline({ data, color = '#6366f1', width = 40, height = 20 }: SparklineProps): JSX.Element {
  if (data.length < 2) {
    return <svg width={width} height={height} />;
  }

  const max = Math.max(...data);
  const min = Math.min(...data);

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    let y = 0;
    if (max === min) { // Handle flat line
      y = height / 2;
    } else {
      y = height - ((d - min) / (max - min)) * height;
    }
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  change?: { amount: string | number; type: 'up' | 'down' | 'neutral' };
  icon?: React.ReactNode;
  sparkline?: number[];
  className?: string;
}

export function StatCard({ title, value, change, icon, sparkline, className }: StatCardProps): JSX.Element {
  const changeColor = {
    up: 'text-emerald-600',
    down: 'text-red-500',
    neutral: 'text-zinc-500',
  };

  const changeIcon = change?.type === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;

  return (
    <Card className={cn('p-5 flex flex-col', className)}>
      <div className="flex items-center justify-between">
        <CardTitle className="!text-sm !font-medium text-zinc-600 tracking-normal">{title}</CardTitle>
        {icon && React.isValidElement(icon) ? React.cloneElement(icon, { className: 'h-5 w-5 text-zinc-400' }) : icon}
      </div>
      <div className="flex items-end justify-between mt-3">
        <p className="text-3xl font-bold text-zinc-900">{value}</p>
        {sparkline && <Sparkline data={sparkline} />}
      </div>
      {change && (
        <p className={cn('flex items-center gap-1 text-sm mt-2', changeColor[change.type])}>
          {changeIcon}
          <span>{change.amount}</span>
        </p>
      )}
    </Card>
  );
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps): JSX.Element | null {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEscape);
    } else {
      document.removeEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, handleEscape]);

  if (!open) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className={cn('bg-white rounded-2xl shadow-xl animate-slideup w-full max-h-[90vh] flex flex-col', sizeClasses[size])}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-200">
          <h3 id="modal-title" className="text-xl font-bold text-zinc-900 tracking-tight">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close modal">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-6 overflow-y-auto flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
}

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps): JSX.Element {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <div className="p-3 bg-zinc-100 rounded-xl mb-4 text-zinc-500">
        {React.isValidElement(icon) ? React.cloneElement(icon, { className: 'h-8 w-8' }) : icon}
      </div>
      <h3 className="text-lg font-bold text-zinc-900 tracking-tight mb-2">{title}</h3>
      <p className="text-zinc-600 max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}

interface TableProps<T> {
  columns: Array<{ key: keyof T | 'actions'; label: string; render?: (row: T) => React.ReactNode }>;
  data: T[];
  onRowClick?: (row: T) => void;
  className?: string;
}

export function Table<T extends { id: string }>({ columns, data, onRowClick, className }: TableProps<T>): JSX.Element {
  return (
    <div className={cn('w-full overflow-hidden rounded-xl border border-zinc-200 shadow-sm', className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-zinc-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 whitespace-nowrap text-center text-sm text-zinc-500">
                  No data to display.
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={cn(
                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-zinc-50',
                    onRowClick && 'cursor-pointer hover:bg-zinc-100 transition-colors duration-150'
                  )}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column) => (
                    <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap text-sm text-zinc-800">
                      {column.render ? column.render(row) : (row[column.key as keyof T] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}