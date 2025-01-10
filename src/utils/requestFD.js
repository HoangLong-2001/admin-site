import { getCookie } from "../helpers/cookie";

const API_PATH = "https://sportshop-api.onrender.com/";
export async function getAuthFD(path) {
  const response = await fetch(`${API_PATH}${path}`, {
    headers: {
      authorization: `bearer ${getCookie("accessToken")}`,
      Accept: "multipart/form-data",
      "Content-Type": "multipart/form-data",
    },
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
export async function putAuthFD(path, option) {
  const response = await fetch(`${API_PATH}${path}`, {
    method: "put",
    headers: {
      authorization: `bearer ${getCookie("accessToken")}`,
    },
    body: option,
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
export async function postAuthFD(path, option) {
  console.log(option);

  const response = await fetch(`${API_PATH}${path}`, {
    method: "post",
    headers: {
      authorization: `bearer ${getCookie("accessToken")}`,
    },
    body: option,
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
export async function delAuthFD(path) {
  const response = await fetch(`${API_PATH}${path}`, {
    method: "DELETE",
    headers: {
      authorization: `bearer ${getCookie("accessToken")}`,
    },
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
