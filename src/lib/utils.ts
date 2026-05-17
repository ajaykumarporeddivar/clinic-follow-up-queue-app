import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(isoDateString: string): string {
  if (!isoDateString) return '';
  const date = new Date(isoDateString);
  if (isNaN(date.getTime())) return isoDateString; // Return original if invalid date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatDateTime(isoDateString: string): string {
  if (!isoDateString) return '';
  const date = new Date(isoDateString);
  if (isNaN(date.getTime())) return isoDateString;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
}

export function formatRelativeTime(isoDateString: string): string {
  if (!isoDateString) return '';
  const date = new Date(isoDateString);
  if (isNaN(date.getTime())) return isoDateString;

  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const weeks = Math.round(days / 7);
  const months = Math.round(days / 30);
  const years = Math.round(days / 365);

  if (seconds < 45) return 'just now';
  if (seconds < 90) return 'a minute ago';
  if (minutes < 45) return `${minutes} minutes ago`;
  if (minutes < 90) return 'an hour ago';
  if (hours < 22) return `${hours} hours ago`;
  if (hours < 36) return 'a day ago';
  if (days < 25) return `${days} days ago`;
  if (days < 45) return 'a month ago';
  if (months < 11) return `${months} months ago`;
  if (months < 18) return 'a year ago';
  return `${years} years ago`;
}

export function truncate(str: string, len: number): string {
  if (str.length <= len) {
    return str;
  }
  return str.slice(0, len) + '...';
}

export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateId(): string {
  // Fallback for environments where crypto.randomUUID is not available (e.g., older Node.js versions in some build environments)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat('en-US', options).format(value);
}

export function groupBy<T>(array: T[], key: keyof T): Map<T[keyof T], T[]> {
  return array.reduce((acc, item) => {
    const groupKey = item[key];
    if (!acc.has(groupKey)) {
      acc.set(groupKey, []);
    }
    acc.get(groupKey)?.push(item);
    return acc;
  }, new Map<T[keyof T], T[]>());
}

export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];
    if (valA === valB) return 0;

    if (typeof valA === 'string' && typeof valB === 'string') {
      return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    if (typeof valA === 'number' && typeof valB === 'number') {
      return order === 'asc' ? valA - valB : valB - valA;
    }
    // Fallback for other types or mixed types
    return 0;
  });
}