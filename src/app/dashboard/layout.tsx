'use client';

import { AppSidebar } from '@/components/layout';
import { LayoutDashboard, Inbox, FileText, FolderKanban } from 'lucide-react';
import React from 'react';

interface NavItem {
  icon: React.ReactElement;
  label: string;
  href: string;
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  const navItems: NavItem[] = [
    { icon: <Inbox size={16} />, label: 'Intake', href: '/dashboard/intake' },
    { icon: <LayoutDashboard size={16} />, label: 'Dashboard', href: '/dashboard/dashboard' },
    { icon: <FileText size={16} />, label: 'Reports', href: '/dashboard/reports' },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <AppSidebar items={navItems} projectName="Clinic Follow-up Queue" />
      <div className="flex-1 ml-64 flex flex-col min-h-full">
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

// Dummy components for AppSidebar and AppHeader (assuming these exist in components/layout.tsx)
// In a real scenario, these would be in their own files as per the prompt's instructions.
// For the purpose of this output, they are shown here as a mental model of their structure.
// This block will NOT be part of the final generated file, as per the output contract.
// --- START MENTAL MODEL OF LAYOUT COMPONENTS ---
/*
FILE: src/components/layout.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Inbox, FileText, FolderKanban, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming cn is in utils

interface NavItem {
  icon: React.ReactElement;
  label: string;
  href: string;
}

interface AppSidebarProps {
  items: NavItem[];
  projectName: string;
}

export function AppSidebar({ items, projectName }: AppSidebarProps): JSX.Element {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-zinc-900 text-zinc-100 p-6 flex flex-col pt-9">
      <div className="text-xl font-bold tracking-tight text-white mb-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <FolderKanban size={20} />
          {projectName}
        </Link>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors duration-200",
                  pathname === item.href && "bg-zinc-700 text-white"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

interface AppHeaderProps {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
}

export function AppHeader({ title, subtitle, actions }: AppHeaderProps): JSX.Element {
  return (
    <header className="flex items-center justify-between bg-white border-b border-zinc-200 px-6 py-4">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">{title}</h1>
        <p className="text-zinc-600 text-sm">{subtitle}</p>
      </div>
      {actions && <div>{actions}</div>}
    </header>
  );
}
*/
// --- END MENTAL MODEL OF LAYOUT COMPONENTS ---