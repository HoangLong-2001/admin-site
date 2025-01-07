import { delAuth, getAuth, putAuth } from "../utils/requestAuth";

export const getAllOrder = async () => {
  const result = await getAuth("order");
  return result;
};
export const deleteOrder = async (orderId) => {
  const result = await delAuth(`order/${orderId}`);
  return result;
};
export const updateOrder = async (orderId, orderData) => {
  const result = await putAuth(`order/${orderId}`, orderData);
  return result;
};