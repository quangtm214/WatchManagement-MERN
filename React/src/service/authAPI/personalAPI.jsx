import { fetchData, putData } from "../fetchAPI";

export const getPersonalAPI = async () => {
  const response = await fetchData("/auth/personal");
  return response;
};
export const changeInforAPI = async (data) => {
  const response = await putData("/accounts/updateMemberName", data);
  console.log("response", response);
  return response;
};
