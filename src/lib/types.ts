export interface Client {
  id: string;
  clinicId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  lastVisitDate: string; // YYYY-MM-DD
  notes?: string;
  status: 'active' | 'inactive' | 'churned';
  createdAt: string;
  updatedAt: string;
}

export interface FollowUpTask {
  id: string;
  clinicId: string;
  clientId: string;
  intakeRecordId?: string;
  taskDescription: string;
  dueDate: string; // YYYY-MM-DD
  priority: 'low' | 'medium' | 'high' | 'urgent';
  outcome?: string; // e.g., "Client scheduled", "Voicemail left", "Email sent"
  status: 'pending' | 'completed' | 'deferred' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface IntakeRecord {
  id: string;
  clinicId: string;
  clientId?: string; // Optional, if client is not yet created or identified
  rawText: string;
  source: 'manual' | 'email' | 'form_upload';
  processedAt?: string; // ISO string
  status: 'new' | 'processed' | 'archived' | 'discarded';
  createdAt: string;
  updatedAt: string;
}

export interface Clinic {
  id: string;
  ownerUserId: string; // Refers to the user who owns this clinic account
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  status: 'active' | 'suspended' | 'trial';
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  clinicId: string;
  title: string;
  description?: string;
  reportType: 'summary' | 'detailed' | 'custom';
  generatedBy: string; // User ID or name
  generatedDate: string; // ISO string
  filePath: string; // Mocked URL to a CSV or PDF
  status: 'generated' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  avatar: string;
  joinedAt: string;
}

export type ApiResponse<T> = { ok: boolean; data?: T; error?: string };
export type SortDir = 'asc' | 'desc';