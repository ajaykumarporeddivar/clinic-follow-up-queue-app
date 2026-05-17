import {
  MOCK_CLIENTS,
  MOCK_FOLLOWUP_TASKS,
  MOCK_INTAKE_RECORDS,
  MOCK_CLINICS,
  MOCK_REPORTS,
  STATS,
} from '@/lib/data';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(): Promise<Response> {
  const data = {
    clients: MOCK_CLIENTS,
    followUpTasks: MOCK_FOLLOWUP_TASKS,
    intakeRecords: MOCK_INTAKE_RECORDS,
    clinics: MOCK_CLINICS,
    reports: MOCK_REPORTS,
  };

  return new Response(
    JSON.stringify({
      ok: true,
      data: {
        clients: data.clients,
        followUpTasks: data.followUpTasks,
        intakeRecords: data.intakeRecords,
        clinics: data.clinics,
        reports: data.reports,
        stats: STATS,
      },
      totalClients: data.clients.length,
      totalFollowUpTasks: data.followUpTasks.length,
      totalIntakeRecords: data.intakeRecords.length,
      totalClinics: data.clinics.length,
      totalReports: data.reports.length,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS,
      },
    },
  );
}

export async function POST(request: Request): Promise<Response> {
  const body = await request.json();

  return new Response(
    JSON.stringify({
      ok: true,
      message: 'Demo mode — data not persisted',
      received: body,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS,
      },
    },
  );
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}