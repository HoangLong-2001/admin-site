import { getCookie } from "../helpers/cookie";
import { post } from "../utils/request";
import { postAuth } from "../utils/requestAuth";
export const login = async ({ email, password, role }) => {
  const result = await post("auth/login", {
    email,
    password,
    type: "employee",
    role,
  });
  return result;
};
export const refreshToken = async (token) => {
  const result = await post("auth/refreshToken", {
    refreshToken: token,
    role:getCookie("role")
  });
  return result;
};
export const logOut = async (token) => {
  const result = await postAuth("auth/logout", {}, token);
  return result;
};
