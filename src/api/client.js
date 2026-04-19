const BASE = import.meta.env.VITE_BACKEND_URL_API;

const getHeaders = () => {
  const token = localStorage.getItem("tsp_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const request = async (method, path, body) => {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: getHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Request failed");
  return json;
};

const uploadFile = async (path, file) => {
  const token = localStorage.getItem("tsp_token");
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Upload failed");
  return json;
};

export const api = {
  get: (path) => request("GET", path),
  post: (path, body) => request("POST", path, body),
  put: (path, body) => request("PUT", path, body),
  delete: (path) => request("DELETE", path),
  upload: (path, file) => uploadFile(path, file),
};
