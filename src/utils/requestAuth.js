import { getCookie } from "../helpers/cookie";

const API_PATH = "http://localhost:8080/";
export async function getAuth(path) {
  const response = await fetch(`${API_PATH}${path}`, {
    headers: {
      authorization: `bearer ${getCookie("accessToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
export async function putAuth(path, option) {
  console.log(path);
  const response = await fetch(`${API_PATH}${path}`, {
    method: "PUT",
    headers: {
      authorization: `bearer ${getCookie("accessToken")}`,
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
export async function postAuth(path, option) {

  
  const response = await fetch(`${API_PATH}${path}`, {
    method: "POST",
    headers: {
      authorization: `bearer ${getCookie("accessToken")}`,
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
export async function delAuth(path) {
  const response = await fetch(`${API_PATH}${path}`, {
    method: "DELETE",
    headers: {
      authorization: `bearer ${getCookie("accessToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
export async function patchAuth(path, option) {
  const response = await fetch(`${API_PATH}${path}`, {
    method: "PATCH",
    headers: {
      authorization: `bearer ${getCookie("accessToken")}`,
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