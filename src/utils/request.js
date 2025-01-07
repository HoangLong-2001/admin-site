const API_PATH = "http://localhost:8080/";
export async function get(path) {
  const response = await fetch(`${API_PATH}${path}`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
export async function post(path, option) {
  const response = await fetch(`${API_PATH}${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(option),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
export async function Delete(path) {
  const response = await fetch(`${API_PATH}${path}`, {
    method: "DELETE",
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
export async function put(path, option) {
  const response = await fetch(`${API_PATH}${path}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(option),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
