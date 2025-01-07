import { post } from "../utils/request";
import { delAuth, getAuth, patchAuth, postAuth, putAuth } from "../utils/requestAuth";

// export const login = async ({ email, password ,role}) => {
//   const result = await post("auth/login", { email, password ,type:"employee",role});
//   return result;
// };
export const getAnEmployee = async () => {
  const result = await getAuth("employee");
  return result;
};
export const updateAnEmployee = async (url, data) => {
  const result = await patchAuth(url, data);
  return result;
};
export const getAllEmployee = async () => {
  const result = await getAuth("staff");
  return result;
};
export const createAnEmployee = async (data) => {
  const result = await postAuth("employee", data);
  return result;
};
export const deleteAnEmployee = async (id) => {
  const result = await delAuth(`staff/${id}`);
  return result;
};

export const updateAnEmployeeById = async (id, data) => {
  const result = await putAuth(`staff/${id}`, data);
  return result;
};
