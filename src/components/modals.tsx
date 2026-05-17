'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { cn, Modal, Button, Input, Badge, Avatar, Separator } from '@/components/ui';
import { Command, Search, Calendar, User, ClipboardList, AlertTriangle, Info, CheckCircle, Trash2, Archive, Check } from 'lucide-react';
import { FollowUpTask, Client } from '@/lib/types'; // Assuming these types are available

interface EntityDetailModalProps {
  item: Record<string, unknown> | null;
  open: boolean;
  onClose: () => void;
  title: string;
  onApprove?: (item: Record<string, unknown>) => void;
  onArchive?: (item: Record<string, unknown>) => void;
  onDelete?: (item: Record<string, unknown>) => void;
}

export function EntityDetailModal({
  item,
  open,
  onClose,
  title,
  onApprove,
  onArchive,
  onDelete,
}: EntityDetailModalProps): JSX.Element {
  if (!item) return <Modal open={open} onClose={onClose} title={title}></Modal>;

  const formatValue = (key: string, value: unknown): React.ReactNode => {
    if (key.toLowerCase().includes('date') && typeof value === 'string') {
      try {
        return new Date(value).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      } catch {
        return value; // Fallback if date parsing fails
      }
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return String(value);
  };

  const getStatusBadgeVariant = (status: string): 'success' | 'warning' | 'info' | 'danger' => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === 'active' || lowerStatus === 'completed' || lowerStatus === 'approved') return 'success';
    if (lowerStatus === 'pending' || lowerStatus === 'deferred' || lowerStatus === 'new' || lowerStatus === 'trial') return 'warning';
    if (lowerStatus === 'inactive' || lowerStatus === 'archived' || lowerStatus === 'cancelled') return 'info';
    if (lowerStatus === 'churned' || lowerStatus === 'deleted' || lowerStatus === 'suspended') return 'danger';
    return 'info';
  };

  const currentStatus = (item.status as string) || 'N/A';
  const displayFields = Object.entries(item).filter(([key]) => key !== 'id' && key !== 'clinicId' && key !== '__typename');

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-zinc-900">{title} Details</h3>
        {currentStatus && (
          <Badge variant={getStatusBadgeVariant(currentStatus)}>
            {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
          </Badge>
        )}
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm mb-6">
        {displayFields.map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <span className="font-medium text-zinc-500 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <span className="text-zinc-800">{formatValue(key, value)}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200">
        {onApprove && (
          <Button variant="secondary" onClick={() => onApprove(item)}>
            <Check className="h-4 w-4 mr-2" /> Approve
          </Button>
        )}
        {onArchive && (
          <Button variant="secondary" onClick={() => onArchive(item)}>
            <Archive className="h-4 w-4 mr-2" /> Archive
          </Button>
        )}
        {onDelete && (
          <Button variant="danger" onClick={() => onDelete(item)}>
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </Button>
        )}
        <Button onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
}

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmLabel?: string;
  variant?: 'danger' | 'info';
}

export function ConfirmModal({
  open,
  onClose,
  title,
  message,
  onConfirm,
  confirmLabel = 'Confirm',
  variant = 'info',
}: ConfirmModalProps): JSX.Element {
  const isDanger = variant === 'danger';

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="flex items-center space-x-3 mb-4">
        {isDanger ? (
          <AlertTriangle className="h-6 w-6 text-red-500" />
        ) : (
          <Info className="h-6 w-6 text-blue-500" />
        )}
        <p className="text-zinc-700 text-base">{message}</p>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant={isDanger ? 'danger' : 'primary'} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}

interface CommandPaletteItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  description?: string;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: CommandPaletteItem[];
}

export function CommandPalette({ open, onClose, items }: CommandPaletteProps): JSX.Element {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setSearch('');
      setSelectedIndex(0);
    }
  }, [open]);

  const filteredItems = React.useMemo(() => {
    if (!search) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  useEffect(() => {
    if (filteredItems.length > 0) {
      setSelectedIndex(0);
    }
  }, [filteredItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredItems.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          router.push(filteredItems[selectedIndex].href);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, selectedIndex, filteredItems, router, onClose]);

  useEffect(() => {
    // Scroll selected item into view
    itemRefs.current[selectedIndex]?.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth',
    });
  }, [selectedIndex]);

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} title="Command Palette" showCloseButton={false} className="max-w-xl p-0">
      <div className="flex items-center border-b border-zinc-200 px-4 py-3">
        <Search className="h-5 w-5 text-zinc-400 mr-2 flex-shrink-0" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search commands or navigate..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-0 focus:ring-0 shadow-none text-base"
        />
      </div>
      <div className="max-h-[300px] overflow-y-auto py-2">
        {filteredItems.length === 0 ? (
          <p className="text-center text-zinc-500 py-6">No results found.</p>
        ) : (
          filteredItems.map((item, index) => (
            <div
              key={item.href}
              ref={(el) => (itemRefs.current[index] = el)}
              className={cn(
                'flex items-center px-4 py-2 cursor-pointer',
                'hover:bg-zinc-100 transition-colors duration-150',
                selectedIndex === index && 'bg-zinc-100'
              )}
              onClick={() => {
                router.push(item.href);
                onClose();
              }}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {item.icon && <span className="mr-3 text-zinc-600">{item.icon}</span>}
              <div>
                <p className="font-medium text-zinc-900">{item.label}</p>
                {item.description && <p className="text-zinc-500 text-sm">{item.description}</p>}
              </div>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
}