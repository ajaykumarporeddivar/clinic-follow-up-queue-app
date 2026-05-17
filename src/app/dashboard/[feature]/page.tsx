'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Input } from '@/components/ui'
import { AppHeader } from '@/components/layout'
import { formatDate, formatCurrency } from '@/lib/utils' // Keep formatCurrency even if not used, it's a utility
import { MOCK_CLIENTS, MOCK_FOLLOWUP_TASKS, MOCK_INTAKE_RECORDS, MOCK_REPORTS } from '@/lib/data'
import { Search, Plus, Download, Eye, CheckCircle } from 'lucide-react'
import type { Client, FollowUpTask, IntakeRecord, Report } from '@/lib/types' // Import types for strictness

export default function FeaturePage() {
  const params = useParams()
  const slug = (params.feature as string) ?? ''
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('') // For dashboard
  const [selected, setSelected] = useState<string | null>(null)

  // Helper to find client details
  const getClient = (clientId: string) => MOCK_CLIENTS.find(c => c.id === clientId);

  // ── Feature 1: Client Intake & Task Creation (/dashboard/intake) ──────────────────────
  if (slug === 'intake') {
    const items = MOCK_INTAKE_RECORDS.filter((i: IntakeRecord) =>
      (!search || i.rawText.toLowerCase().includes(search.toLowerCase()) ||
       (i.clientId && getClient(i.clientId)?.firstName.toLowerCase().includes(search.toLowerCase())) ||
       (i.clientId && getClient(i.clientId)?.lastName.toLowerCase().includes(search.toLowerCase()))) &&
      (!statusFilter || i.status === statusFilter)
    )

    const getIntakeStatusBadgeVariant = (status: IntakeRecord['status']) => {
      switch (status) {
        case 'processed': return 'success';
        case 'new': return 'info';
        case 'archived':
        case 'discarded': return 'error';
        default: return 'info';
      }
    };

    return (
      <div className="space-y-6">
        <AppHeader
          title="Client Intake & Task Creation"
          subtitle={`${items.length} intake records total`}
          actions={<Button size="sm"><Plus size={14} className="mr-1" />New Intake</Button>}
        />
        <Card>
          <CardHeader>
            <div className="flex gap-3">
              <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <Input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search intake records..."
                  className="w-full pl-9 pr-3 py-2 text-sm"
                />
              </div>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white focus:outline-none"
              >
                <option value="">All statuses</option>
                <option value="new">New</option>
                <option value="processed">Processed</option>
                <option value="archived">Archived</option>
                <option value="discarded">Discarded</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-100">
                <tr className="text-left text-zinc-500 text-xs uppercase tracking-wide">
                  <th className="px-6 py-3">Raw Text</th>
                  <th className="px-6 py-3">Client Name</th>
                  <th className="px-6 py-3">Source</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Created Date</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {items.map((item: IntakeRecord) => {
                  const client = item.clientId ? getClient(item.clientId) : null;
                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelected(selected === item.id ? null : item.id)}
                      className={`hover:bg-zinc-50 cursor-pointer transition-colors ${selected === item.id ? 'bg-zinc-50' : ''}`}
                    >
                      <td className="px-6 py-3 max-w-xs truncate font-medium text-zinc-900">{item.rawText}</td>
                      <td className="px-6 py-3 text-zinc-500">{client ? `${client.firstName} ${client.lastName}` : 'N/A'}</td>
                      <td className="px-6 py-3 text-zinc-700 capitalize">{item.source}</td>
                      <td className="px-6 py-3">
                        <Badge variant={getIntakeStatusBadgeVariant(item.status)}>
                          {item.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-3 text-zinc-400 text-xs">{formatDate(item.createdAt)}</td>
                      <td className="px-6 py-3 text-right">
                        <button className="text-zinc-400 hover:text-zinc-700 p-1"><Eye size={14} /></button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="px-6 py-3 border-t border-zinc-100 text-xs text-zinc-400">
              Showing {items.length} of {MOCK_INTAKE_RECORDS.length} intake records
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── Feature 2: Follow-up Prioritization Dashboard (/dashboard/dashboard) ──────────────────────
  if (slug === 'dashboard') {
    const items = MOCK_FOLLOWUP_TASKS.filter((t: FollowUpTask) => {
      const client = getClient(t.clientId);
      const clientName = client ? `${client.firstName} ${client.lastName}` : '';
      return (
        (!search || clientName.toLowerCase().includes(search.toLowerCase()) ||
         t.taskDescription.toLowerCase().includes(search.toLowerCase())) &&
        (!statusFilter || t.status === statusFilter) &&
        (!priorityFilter || t.priority === priorityFilter)
      );
    });

    const getTaskStatusBadgeVariant = (status: FollowUpTask['status']) => {
      switch (status) {
        case 'pending': return 'warning';
        case 'completed': return 'success';
        case 'deferred': return 'info';
        case 'cancelled': return 'error';
        default: return 'info';
      }
    };

    const getTaskPriorityBadgeVariant = (priority: FollowUpTask['priority']) => {
      switch (priority) {
        case 'urgent':
        case 'high': return 'error';
        case 'medium': return 'warning';
        case 'low': return 'info';
        default: return 'info';
      }
    };

    return (
      <div className="space-y-6">
        <AppHeader
          title="Follow-up Prioritization Dashboard"
          subtitle={`${items.length} outstanding tasks`}
          actions={<Button size="sm"><Plus size={14} className="mr-1" />Add Follow-up</Button>}
        />
        <Card>
          <CardHeader>
            <div className="flex gap-3">
              <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <Input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search tasks..."
                  className="w-full pl-9 pr-3 py-2 text-sm"
                />
              </div>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white focus:outline-none"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="deferred">Deferred</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={priorityFilter}
                onChange={e => setPriorityFilter(e.target.value)}
                className="px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white focus:outline-none"
              >
                <option value="">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-100">
                <tr className="text-left text-zinc-500 text-xs uppercase tracking-wide">
                  <th className="px-6 py-3">Client Name</th>
                  <th className="px-6 py-3">Last Visit</th>
                  <th className="px-6 py-3">Task Description</th>
                  <th className="px-6 py-3">Due Date</th>
                  <th className="px-6 py-3">Priority</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {items.map((item: FollowUpTask) => {
                  const client = getClient(item.clientId);
                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelected(selected === item.id ? null : item.id)}
                      className={`hover:bg-zinc-50 cursor-pointer transition-colors ${selected === item.id ? 'bg-zinc-50' : ''}`}
                    >
                      <td className="px-6 py-3 font-medium text-zinc-900">{client ? `${client.firstName} ${client.lastName}` : 'N/A'}</td>
                      <td className="px-6 py-3 text-zinc-500">{client?.lastVisitDate ? formatDate(client.lastVisitDate) : 'N/A'}</td>
                      <td className="px-6 py-3 text-zinc-700 max-w-xs truncate">{item.taskDescription}</td>
                      <td className="px-6 py-3 text-zinc-500">{formatDate(item.dueDate)}</td>
                      <td className="px-6 py-3">
                        <Badge variant={getTaskPriorityBadgeVariant(item.priority)}>{item.priority}</Badge>
                      </td>
                      <td className="px-6 py-3">
                        <Badge variant={getTaskStatusBadgeVariant(item.status)}>
                          {item.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-3">
                        <button className="text-zinc-400 hover:text-zinc-700 p-1 mr-1"><Eye size={14} /></button>
                        {item.status === 'pending' && (
                          <button className="text-emerald-500 hover:text-emerald-700 p-1" title="Mark Complete"><CheckCircle size={14} /></button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="px-6 py-3 border-t border-zinc-100 text-xs text-zinc-400">
              Showing {items.length} of {MOCK_FOLLOWUP_TASKS.length} tasks
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── Feature 3: Reports Generation (/dashboard/reports) ──────────────────────
  if (slug === 'reports') {
    const items = MOCK_REPORTS.filter((i: Report) =>
      !search || i.title.toLowerCase().includes(search.toLowerCase()) ||
      (i.description && i.description.toLowerCase().includes(search.toLowerCase()))
    )

    const getReportStatusBadgeVariant = (status: Report['status']) => {
      switch (status) {
        case 'generated': return 'success';
        case 'pending': return 'info';
        default: return 'info';
      }
    };

    return (
      <div className="space-y-6">
        <AppHeader
          title="Reports Generation"
          subtitle={`${items.length} generated reports`}
          actions={
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Download size={14} className="mr-1" />Export</Button>
              <Button size="sm"><Plus size={14} className="mr-1" />Generate New Report</Button>
            </div>
          }
        />
        <Card>
          <CardHeader>
            <div className="relative max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search reports..."
                className="w-full pl-9 pr-3 py-2 text-sm"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-100">
                <tr className="text-left text-zinc-500 text-xs uppercase tracking-wide">
                  <th className="px-6 py-3">Report Title</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Generated By</th>
                  <th className="px-6 py-3">Generated Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {items.map((item: Report) => (
                  <tr key={item.id} className="hover:bg-zinc-50 cursor-pointer" onClick={() => setSelected(item.id)}>
                    <td className="px-6 py-3 font-medium text-zinc-900">{item.title}</td>
                    <td className="px-6 py-3 text-zinc-500 capitalize">{item.reportType}</td>
                    <td className="px-6 py-3 text-zinc-700">{item.generatedBy}</td>
                    <td className="px-6 py-3 text-zinc-400 text-xs">{formatDate(item.generatedDate)}</td>
                    <td className="px-6 py-3">
                      <Badge variant={getReportStatusBadgeVariant(item.status)}>{item.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-3 border-t border-zinc-100 text-xs text-zinc-400">
              Showing {items.length} of {MOCK_REPORTS.length} reports
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── Default: feature hub ──────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <AppHeader title="Features" subtitle="Select a feature to get started" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            slug: 'intake',
            name: 'Client Intake',
            description: 'Transform raw client notes into structured follow-up tasks.',
            count: MOCK_INTAKE_RECORDS.length,
          },
          {
            slug: 'dashboard',
            name: 'Follow-up Dashboard',
            description: 'Prioritize and manage all outstanding client follow-up tasks.',
            count: MOCK_FOLLOWUP_TASKS.length,
          },
          {
            slug: 'reports',
            name: 'Reports Generation',
            description: 'Generate client-ready reports to prove ROI and track engagement.',
            count: MOCK_REPORTS.length,
          },
        ].map(f => (
          <a key={f.slug} href={`/dashboard/${f.slug}`}>
            <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                  <FolderKanban size={20} />
                </div>
                <h3 className="font-bold text-zinc-900 mb-1">{f.name}</h3>
                <p className="text-zinc-500 text-sm mb-4">{f.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">{f.count} records</span>
                  <span className="text-xs font-medium text-indigo-600">Open →</span>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  )
}