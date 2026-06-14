const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function buildUrl(endpoint) {
  return `${BASE_URL}${endpoint.startsWith("/") ? endpoint : "/" + endpoint}`;
}

export async function request(endpoint, options = {}) {
  const res = await fetch(buildUrl(endpoint), {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.detail || data?.message || "API request failed");
  }

  return data;
}

export function searchRecipes(query = "", category = "All") {
  const params = new URLSearchParams();

  if (query.trim()) params.append("q", query.trim());
  if (category !== "All") params.append("category", category);

  const queryString = params.toString();

  return request(
    queryString ? `/search/?${queryString}` : `/search/`
  );
}

export function getCategories() {
  return request("/categories/");
}
