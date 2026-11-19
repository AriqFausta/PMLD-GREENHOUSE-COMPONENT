
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("auth_token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  const data =
    response.status === 204
      ? null
      : isJson
        ? await response.json()
        : await response.text();

  if (!response.ok) {
    const errorMessage =
      typeof data === "object" && data !== null
        ? data.message || data.error
        : data;

    throw new Error(
      errorMessage || `API Error: ${response.status}`
    );
  }

  return data;
}

export { API_BASE_URL, apiRequest };
