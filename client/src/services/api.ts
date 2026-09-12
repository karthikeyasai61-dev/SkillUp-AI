import {
  User,
  StudentProfile,
  EvolvedCurriculum,
  DailyTask,
  BacklogTask,
  Milestone,
  AssessmentData,
  TodayOverview
} from '../types';

const API_BASE = '/api';

function getHeaders(): HeadersInit {
  const token = localStorage.getItem('skillup_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export const api = {
  // Auth
  async register(name: string, email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Registration failed');
    }
    return res.json();
  },

  async login(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Login failed');
    }
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Session expired');
    return res.json();
  },

  // Presets
  async getPresets() {
    const res = await fetch(`${API_BASE}/presets`);
    return res.json();
  },

  // PDF Extraction
  async extractPdf(file: File): Promise<{ fileName: string; characterCount: number; extractedText: string }> {
    const formData = new FormData();
    formData.append('file', file);
    const token = localStorage.getItem('skillup_token');
    const res = await fetch(`${API_BASE}/curriculum/extract-pdf`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to extract text from PDF');
    }
    return res.json();
  },

  // Profile & Curriculum
  async saveProfile(profileData: Partial<StudentProfile>) {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(profileData)
    });
    if (!res.ok) throw new Error('Failed to save profile');
    return res.json();
  },

  async uploadAndEvolveCurriculum(data: {
    rawText: string;
    branch: string;
    semester: string;
    fileName?: string;
    profileData?: Partial<StudentProfile>;
  }) {
    const res = await fetch(`${API_BASE}/curriculum/upload-and-evolve`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to evolve curriculum');
    }
    return res.json();
  },

  async getPersonalizedCurriculum(): Promise<EvolvedCurriculum> {
    const res = await fetch(`${API_BASE}/curriculum/personalized`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Personalized curriculum not found');
    return res.json();
  },

  // Plans & Tasks
  async getSemesterPlan() {
    const res = await fetch(`${API_BASE}/plans/semester`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Semester plan not found');
    return res.json();
  },

  async getWeeklyPlan(weekNumber?: number) {
    const url = weekNumber ? `${API_BASE}/plans/weekly?week=${weekNumber}` : `${API_BASE}/plans/weekly`;
    const res = await fetch(url, { headers: getHeaders() });
    if (!res.ok) throw new Error('Weekly plan not found');
    return res.json();
  },

  async getTodayOverview(): Promise<TodayOverview> {
    const res = await fetch(`${API_BASE}/plans/today`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to load today plan');
    return res.json();
  },

  async updateTaskStatus(taskId: string, status: string) {
    const res = await fetch(`${API_BASE}/tasks/${taskId}/status`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update task status');
    return res.json();
  },

  // Backlog
  async getBacklog(): Promise<{ tasks: BacklogTask[]; stats: { total: number; pending: number; completed: number } }> {
    const res = await fetch(`${API_BASE}/backlog`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to load backlog');
    return res.json();
  },

  async updateBacklogStatus(id: string, status: string) {
    const res = await fetch(`${API_BASE}/backlog/${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update backlog');
    return res.json();
  },

  // Adaptive Loop
  async adaptWeekReview() {
    const res = await fetch(`${API_BASE}/adaptive/week-review`, {
      method: 'POST',
      headers: getHeaders()
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to trigger weekly adaptation');
    }
    return res.json();
  },

  // Milestones & Assessments
  async getMilestones(): Promise<{ milestones: Milestone[] }> {
    const res = await fetch(`${API_BASE}/milestones`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to load milestones');
    return res.json();
  },

  async getAssessment(topic?: string): Promise<AssessmentData> {
    const url = topic ? `${API_BASE}/assessment?topic=${encodeURIComponent(topic)}` : `${API_BASE}/assessment`;
    const res = await fetch(url, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to load assessment');
    return res.json();
  },

  async submitMilestone(milestoneId: string, score: number, userAnswers?: any) {
    const res = await fetch(`${API_BASE}/milestones/${milestoneId}/submit`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ score, userAnswers })
    });
    if (!res.ok) throw new Error('Failed to submit milestone');
    return res.json();
  },

  // AI Engine Settings (Groq + Google Gemini Fallback)
  async getGroqStatus() {
    const res = await fetch(`${API_BASE}/settings/ai-status`);
    return res.json();
  },

  async getAiStatus() {
    const res = await fetch(`${API_BASE}/settings/ai-status`);
    return res.json();
  },

  async saveGroqKey(apiKey: string) {
    const res = await fetch(`${API_BASE}/settings/groq-key`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to save Groq Key');
    }
    return res.json();
  },

  async saveGeminiKey(apiKey: string) {
    const res = await fetch(`${API_BASE}/settings/gemini-key`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to save Gemini Key');
    }
    return res.json();
  }
};
