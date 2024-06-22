import { deleteData, fetchData, postData, putData } from "../fetchAPI";

export const getWatchAPI = async () => {
  const respone = await fetchData("/");
  return respone;
};
export const getWatchQueryAPI = async (watchName, brand) => {
  const respone = await fetchData(
    "/?watchName=" + watchName + "&brand=" + brand
  );
  return respone;
};

export const getDetailWatchAPI = async (watchId) => {
  const respone = await fetchData(`/watchs/detail/${watchId}`);
  console.log("respone", respone);
  return respone;
};

export const addCommentAPI = async (watchId, comment) => {
  console.log("comment", comment);
  const respone = await postData(`/watchs/addComments/${watchId}`, comment);
  return respone;
};

export const deleteCommentAPI = async (watchId, commentId) => {
  const respone = await deleteData(
    `/watchs/deleteComment/${watchId}/${commentId}`
  );
  return respone;
};

export const editCommentAPI = async (watchId, comment) => {
  const respone = await putData(`/watchs/editComment/${watchId}`, comment);
  return respone;
};

export const addWatchAPI = async (watch) => {
  const respone = await postData("/watchs", watch);
  return respone;
};

export const updateWatchAPI = async (watchId, watch) => {
  const respone = await putData(`/watchs/edit/${watchId}`, watch);
  return respone;
};

export const deleteWatchAPI = async (watchId) => {
  const respone = await deleteData(`/watchs/delete/${watchId}`);
  return respone;
};
