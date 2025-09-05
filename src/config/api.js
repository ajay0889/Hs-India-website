const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

export function getApiBase() {
  return API_BASE.replace(/\/$/, "");
}

export function withBase(path) {
  const base = getApiBase();
  if (!path) return base;
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : "/" + path}`;
}


