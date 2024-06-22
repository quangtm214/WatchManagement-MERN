import { postData } from "../fetchAPI";

export const Register = async (member) => {
  console.log("member", member);
  const response = await postData("/auth/signup", member);
  return response;
};
