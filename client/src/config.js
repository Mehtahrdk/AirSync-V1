// If we are in production (live), use the live backend URL.
// If we are local, use localhost.
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";