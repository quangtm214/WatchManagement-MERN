import { fetchData } from "../fetchAPI";

export const getMembersAPI = async () => {
  const response = await fetchData("/accounts");
  return response;
};
