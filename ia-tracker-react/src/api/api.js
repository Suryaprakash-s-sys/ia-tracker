// ─── API BASE URL ─────────────────────────────────────────────────────────────
const BASE = "https://ia-tracker-backend-c84m.onrender.com";

// ─── CORE REQUEST FUNCTION ────────────────────────────────────────────────────
export const request = async (path, method = "GET", body = null) => {
  const token = localStorage.getItem("ia_token");
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `HTTP Error ${res.status}`);
  }

  const text = await res.text();
  if (!text) return {};
  try {
    return JSON.parse(text);         // JSON response → parse normally
  } catch {
    return { message: text };        // Plain string → wrap in object
  }
};

// ─── AUTH API ─────────────────────────────────────────────────────────────────
export const authAPI = {
  login:    (data) => request("/api/auth/login",    "POST", data),
  register: (data) => request("/api/auth/register", "POST", data),
};

// ─── INTERVIEW API ────────────────────────────────────────────────────────────
export const interviewAPI = {
  getAll: ()     => request("/api/interviews"),
  create: (data) => request("/api/interviews",       "POST",   data),
  delete: (id)   => request(`/api/interviews/${id}`, "DELETE"),
};

// ─── ROUND API ────────────────────────────────────────────────────────────────
export const roundAPI = {
  getAll: (interviewId)       => request(`/api/interviews/${interviewId}/rounds`),
  create: (interviewId, data) => request(`/api/interviews/${interviewId}/rounds`, "POST", data),
  delete: (interviewId, id)   => request(`/api/interviews/${interviewId}/rounds/${id}`, "DELETE"),
};

// ─── QUESTION API ─────────────────────────────────────────────────────────────
export const questionAPI = {
  getAll: (roundId)       => request(`/api/rounds/${roundId}/questions`),
  create: (roundId, data) => request(`/api/rounds/${roundId}/questions`, "POST", data),
  delete: (roundId, id)   => request(`/api/rounds/${roundId}/questions/${id}`, "DELETE"),
};

// ─── FAILURE API ──────────────────────────────────────────────────────────────
export const failureAPI = {
  getAll: (roundId)       => request(`/api/rounds/${roundId}/failures`),
  create: (roundId, data) => request(`/api/rounds/${roundId}/failures`, "POST", data),
  delete: (roundId, id)   => request(`/api/rounds/${roundId}/failures/${id}`, "DELETE"),
};