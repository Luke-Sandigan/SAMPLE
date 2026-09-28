const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body.message || body.error || "Request failed.");
  }

  return body;
}

export const authApi = {
  register: (data) => request("/register", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  login: (data) => request("/login", {
    method: "POST",
    body: JSON.stringify(data),
  }),
};

export const taskApi = {
  list: () => request("/tasks"),
  create: (data) => request("/tasks", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  update: (id, data) => request(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),
  remove: (id) => request(`/tasks/${id}`, {
    method: "DELETE",
  }),
};
