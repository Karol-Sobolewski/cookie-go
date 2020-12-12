export const API_URL =
  (process.env.NODE_ENV === `production` || process.env.NODE_ENV === `development`) ? `/api` : `http://localhost:8000/api`;
