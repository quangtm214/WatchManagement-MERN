import { deleteData, fetchData, postData, putData } from "../fetchAPI";

export const getBrandAPI = async () => {
  const response = await fetchData("/brands");
  return response;
};
export const addBrandAPI = async (brand) => {
  const response = await postData("/brands", brand);
  return response;
};
export const updateBrandAPI = async (brandId, brand) => {
  console.log("brand", brand);
  const response = await putData(`/brands/edit/${brandId}`, brand);
  return response;
};

export const deleteBrandAPI = async (brandId) => {
  const response = await deleteData(`/brands/delete/${brandId}`);
  return response;
};
