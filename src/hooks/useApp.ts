'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export function useLocalStorage<T>(key: string, initial: T): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        setValue(JSON.parse(storedValue));
      }
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
    }
  }, [key]);

  const setStoredValue = useCallback((newValue: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch (error) {
      console.error('Failed to write to localStorage:', error);
    }
  }, [key]);

  return [value, setStoredValue];
}

export function useFilter<T extends Record<string, unknown>>(
  items: T[],
  fields: (keyof T)[]
): {
  filtered: T[];
  search: string;
  setSearch: (s: string) => void;
  status: string;
  setStatus: (s: string) => void;
} {
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const filtered = React.useMemo(() => {
    let result = items;

    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter((item) =>
        fields.some((field) => {
          const value = item[field];
          return typeof value === 'string' && value.toLowerCase().includes(lowerSearch);
        })
      );
    }

    if (status) {
      result = result.filter((item) => {
        const itemStatus = item['status']; // Assuming 'status' is a common field
        return typeof itemStatus === 'string' && itemStatus.toLowerCase() === status.toLowerCase();
      });
    }

    return result;
  }, [items, fields, search, status]);

  return { filtered, search, setSearch, status, setStatus };
}

export function useModal<T = unknown>(): {
  isOpen: boolean;
  open: (item?: T) => void;
  close: () => void;
  activeItem: T | null;
} {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<T | null>(null);

  const open = useCallback((item?: T) => {
    setActiveItem(item || null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveItem(null); // Clear active item on close
  }, []);

  return { isOpen, open, close, activeItem };
}

export function useDemoToast(): {
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
  show: (msg: string, type?: 'success' | 'error' | 'info') => void;
} {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error' | 'info'>('info');
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const show = useCallback((msg: string, toastType: 'success' | 'error' | 'info' = 'info') => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setMessage(msg);
    setType(toastType);
    setVisible(true);

    timerRef.current = setTimeout(() => {
      setVisible(false);
      setMessage('');
    }, 2500); // Auto-hide after 2.5 seconds
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { message, type, visible, show };
}