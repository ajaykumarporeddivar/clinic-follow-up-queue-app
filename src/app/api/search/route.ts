import {
  MOCK_CLIENTS,
  MOCK_FOLLOWUP_TASKS,
  MOCK_INTAKE_RECORDS,
  MOCK_CLINICS,
  MOCK_REPORTS,
} from '@/lib/data';
import { Client, FollowUpTask, IntakeRecord, Clinic, Report } from '@/lib/types';

interface SearchResult {
  id: string;
  type: string;
  title: string;
  description?: string;
  item: Client | FollowUpTask | IntakeRecord | Clinic | Report;
}

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const typeFilter = searchParams.get('type');

  const normalizedQuery = q.toLowerCase().trim();
  const allResults: SearchResult[] = [];

  // Search Clients
  if (!typeFilter || typeFilter === 'client') {
    MOCK_CLIENTS.forEach((client) => {
      const clientName = `${client.firstName} ${client.lastName}`.toLowerCase();
      if (clientName.includes(normalizedQuery) || client.notes?.toLowerCase().includes(normalizedQuery)) {
        allResults.push({
          id: client.id,
          type: 'client',
          title: clientName,
          description: client.notes,
          item: client,
        });
      }
    });
  }

  // Search FollowUpTasks
  if (!typeFilter || typeFilter === 'task') {
    MOCK_FOLLOWUP_TASKS.forEach((task) => {
      if (task.taskDescription.toLowerCase().includes(normalizedQuery) || task.outcome?.toLowerCase().includes(normalizedQuery)) {
        allResults.push({
          id: task.id,
          type: 'task',
          title: task.taskDescription,
          description: task.outcome,
          item: task,
        });
      }
    });
  }

  // Search IntakeRecords
  if (!typeFilter || typeFilter === 'intake') {
    MOCK_INTAKE_RECORDS.forEach((intake) => {
      if (intake.rawText.toLowerCase().includes(normalizedQuery)) {
        allResults.push({
          id: intake.id,
          type: 'intake',
          title: intake.rawText.substring(0, 50) + '...',
          description: intake.rawText,
          item: intake,
        });
      }
    });
  }

  // Search Clinics
  if (!typeFilter || typeFilter === 'clinic') {
    MOCK_CLINICS.forEach((clinic) => {
      if (clinic.name.toLowerCase().includes(normalizedQuery)) {
        allResults.push({
          id: clinic.id,
          type: 'clinic',
          title: clinic.name,
          description: clinic.address,
          item: clinic,
        });
      }
    });
  }

  // Search Reports
  if (!typeFilter || typeFilter === 'report') {
    MOCK_REPORTS.forEach((report) => {
      if (report.title.toLowerCase().includes(normalizedQuery) || report.description?.toLowerCase().includes(normalizedQuery)) {
        allResults.push({
          id: report.id,
          type: 'report',
          title: report.title,
          description: report.description,
          item: report,
        });
      }
    });
  }

  let finalResults: SearchResult[] = [];

  if (normalizedQuery === '') {
    // If query is empty, return first 5 items across all entities combined
    const combinedFirst5: SearchResult[] = [];
    MOCK_CLIENTS.slice(0, 1).forEach(c => combinedFirst5.push({ id: c.id, type: 'client', title: `${c.firstName} ${c.lastName}`, item: c }));
    MOCK_FOLLOWUP_TASKS.slice(0, 1).forEach(t => combinedFirst5.push({ id: t.id, type: 'task', title: t.taskDescription, item: t }));
    MOCK_INTAKE_RECORDS.slice(0, 1).forEach(i => combinedFirst5.push({ id: i.id, type: 'intake', title: i.rawText.substring(0, 50) + '...', item: i }));
    MOCK_CLINICS.slice(0, 1).forEach(cl => combinedFirst5.push({ id: cl.id, type: 'clinic', title: cl.name, item: cl }));
    MOCK_REPORTS.slice(0, 1).forEach(r => combinedFirst5.push({ id: r.id, type: 'report', title: r.title, item: r }));
    finalResults = combinedFirst5.slice(0, 5); // Ensure maximum 5 total
  } else {
    // Deduplicate results and limit to 20
    const uniqueResults = Array.from(new Map(allResults.map(item => [item.id, item])).values());
    finalResults = uniqueResults.slice(0, 20);
  }

  return Response.json({
    ok: true,
    data: {
      results: finalResults,
      total: finalResults.length,
      query: q,
    },
  });
}