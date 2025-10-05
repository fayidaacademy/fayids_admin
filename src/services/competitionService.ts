/**
 * Competition API Service
 * Handles all API calls related to competitions management
 */

import { apiUrl } from "@/api_config";
import { getAccessToken } from "@/lib/tokenManager";

// Type definitions
export interface Competition {
  id: string;
  title: string;
  description?: string;
  grade: string;
  competitionType: "tournament" | "one-time";
  status: "upcoming" | "active" | "completed" | "cancelled";
  startDate: string;
  endDate: string;
  totalPrizes?: string;
  thumbnail?: string;
  requiresPackage: boolean;
  packageDuration: number;
  maxParticipants?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Exam {
  id: string;
  competitionId: string;
  title: string;
  description?: string;
  day: number;
  scheduledDateTime: string;
  duration: number;
  totalQuestions: number;
  status: "locked" | "active" | "completed";
}

export interface Question {
  id?: string;
  examId?: string;
  questionIndex?: number;
  question: string;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
  correctChoice: "A" | "B" | "C" | "D";
  explanation?: string;
  questionImage?: string;
  explanationImage?: string;
}

export interface Prize {
  id?: string;
  competitionId?: string;
  rank: number;
  prizeName: string;
  description?: string;
  image?: string;
  value?: string;
  winnerId?: string;
  claimStatus?: "pending" | "claimed" | "verified" | "cancelled";
}

export interface Sponsor {
  id?: string;
  competitionId?: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
}

/**
 * Get authorization headers
 */
const getHeaders = (): HeadersInit => {
  const token = getAccessToken();
  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

/**
 * Fetch all competitions
 */
export async function fetchCompetitions(): Promise<Competition[]> {
  const response = await fetch(`${apiUrl}/admin/competitions`, {
    headers: getHeaders(),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch competitions");
  }

  const data = await response.json();
  return data.competitions || [];
}

/**
 * Fetch a single competition by ID
 */
export async function fetchCompetitionById(id: string): Promise<any> {
  const response = await fetch(`${apiUrl}/admin/competitions/${id}`, {
    headers: getHeaders(),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch competition details");
  }

  const data = await response.json();
  return data.competition;
}

/**
 * Create a new competition
 */
export async function createCompetition(competitionData: any): Promise<any> {
  const response = await fetch(`${apiUrl}/admin/competitions`, {
    method: "POST",
    headers: getHeaders(),
    credentials: "include",
    body: JSON.stringify(competitionData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create competition");
  }

  return await response.json();
}

/**
 * Update an existing competition
 */
export async function updateCompetition(id: string, updates: Partial<Competition>): Promise<any> {
  const response = await fetch(`${apiUrl}/admin/competitions/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    credentials: "include",
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update competition");
  }

  return await response.json();
}

/**
 * Update competition status
 */
export async function updateCompetitionStatus(
  id: string,
  status: "upcoming" | "active" | "completed" | "cancelled"
): Promise<any> {
  const response = await fetch(`${apiUrl}/admin/competitions/${id}/status`, {
    method: "PATCH",
    headers: getHeaders(),
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update status");
  }

  return await response.json();
}

/**
 * Delete a competition
 */
export async function deleteCompetition(id: string): Promise<any> {
  const response = await fetch(`${apiUrl}/admin/competitions/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete competition");
  }

  return await response.json();
}

/**
 * Add an exam to a competition
 */
export async function addExam(competitionId: string, examData: Partial<Exam>): Promise<any> {
  const response = await fetch(`${apiUrl}/admin/competitions/${competitionId}/exams`, {
    method: "POST",
    headers: getHeaders(),
    credentials: "include",
    body: JSON.stringify(examData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add exam");
  }

  return await response.json();
}

/**
 * Add questions to an exam
 */
export async function addQuestions(
  competitionId: string,
  examId: string,
  questions: Question[]
): Promise<any> {
  const response = await fetch(
    `${apiUrl}/admin/competitions/${competitionId}/exams/${examId}/questions`,
    {
      method: "POST",
      headers: getHeaders(),
      credentials: "include",
      body: JSON.stringify({ questions }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add questions");
  }

  return await response.json();
}

/**
 * Get competition registrations
 */
export async function fetchRegistrations(competitionId: string): Promise<any[]> {
  const response = await fetch(`${apiUrl}/admin/competitions/${competitionId}/registrations`, {
    headers: getHeaders(),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch registrations");
  }

  const data = await response.json();
  return data.registrations || [];
}

/**
 * Assign prizes to winners
 */
export async function assignPrizes(competitionId: string): Promise<any> {
  const response = await fetch(`${apiUrl}/admin/competitions/${competitionId}/assign-prizes`, {
    method: "POST",
    headers: getHeaders(),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to assign prizes");
  }

  return await response.json();
}

/**
 * Verify a prize winner
 */
export async function verifyPrizeWinner(
  competitionId: string,
  verificationData: {
    prizeId: string;
    studentId: string;
    schoolId: string;
    verificationNotes?: string;
  }
): Promise<any> {
  const response = await fetch(
    `${apiUrl}/admin/competitions/${competitionId}/verify-prize-winner`,
    {
      method: "POST",
      headers: getHeaders(),
      credentials: "include",
      body: JSON.stringify(verificationData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to verify prize winner");
  }

  return await response.json();
}

/**
 * Get prize verification status
 */
export async function fetchPrizeVerification(competitionId: string): Promise<any[]> {
  const response = await fetch(
    `${apiUrl}/admin/competitions/${competitionId}/prize-verification`,
    {
      headers: getHeaders(),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch prize verification status");
  }

  const data = await response.json();
  return data.verificationStatus || [];
}

/**
 * Export competition data
 */
export async function exportCompetitionData(competitionId: string): Promise<any> {
  const response = await fetch(`${apiUrl}/admin/competitions/${competitionId}/export`, {
    headers: getHeaders(),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to export competition data");
  }

  const data = await response.json();
  return data.data;
}

/**
 * Download competition data as JSON file
 */
export function downloadCompetitionExport(competitionId: string, data: any): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `competition-${competitionId}-export.json`;
  a.click();
  window.URL.revokeObjectURL(url);
}

/**
 * Export registrations as CSV
 */
export function exportRegistrationsCSV(competitionId: string, registrations: any[]): void {
  const headers = [
    "Exam ID",
    "Name",
    "Email",
    "Phone",
    "Grade",
    "School",
    "Region",
    "City",
    "Submissions",
    "Registered At",
  ];

  const csvData = registrations.map((reg) => [
    reg.examId,
    `${reg.student.firstName} ${reg.student.lastName}`,
    reg.student.email,
    reg.student.phoneNumber,
    reg.student.gread,
    reg.student.schoolName,
    reg.student.region,
    reg.student.city,
    reg.submissionsCount,
    new Date(reg.registeredAt).toLocaleString(),
  ]);

  const csvContent = [
    headers.join(","),
    ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `competition-${competitionId}-registrations.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
}
