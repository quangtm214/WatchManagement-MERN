import { fetchData } from "../fetchAPI";

export const getMembersAPI = async () => {
  const response = await fetchData("/member/getAllMember");
  return response;
};
