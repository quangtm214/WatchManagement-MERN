import axios from "axios";
import Cookies from "js-cookie";

export const fetchDataEsgoo = async (url) => {
  try {
    const response = await axios.get(url);
    if (response.data.error === 0) {
      return response.data.data;
    } else {
      console.error("Error fetching data:", response.data.error_text);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
  return [];
};

export const fetchData = async (url) => {
  try {
    let token = Cookies.get("jwt");
    if (!token) {
      token = "";
    }
    const response = await axios.get(import.meta.env.VITE_API_HOSTING + url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
  return [];
};

export const postData = async (url, data) => {
  try {
    let token = Cookies.get("jwt");
    if (!token) {
      token = "";
    }
    const response = await axios.post(
      import.meta.env.VITE_API_HOSTING + url,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response fetchAPI", response);
    if (response.status === 201 || response.status === 401) {
      return response;
    } else {
      console.error("Error posting data:", response.status);
    }
  } catch (error) {
    return error.response;
  }
  return null;
};

export const patchData = async (url, data) => {
  try {
    let token = Cookies.get("jwt");
    if (!token) {
      token = "";
    }
    console.log("Data to patch:", data);
    const response = await axios.patch(
      import.meta.env.VITE_API_HOSTING + url,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 201 || response.status === 401) {
      return response;
    } else {
      console.error("Error patching data:", response.status);
    }
  } catch (error) {
    return error.response;
  }
  return null;
};

export const deleteData = async (url, data) => {
  try {
    let token = Cookies.get("jwt");
    if (!token) {
      token = "";
    }
    console.log("token", token);
    console.log("Data to patch:", data);
    const response = await axios.delete(
      import.meta.env.VITE_API_HOSTING + url,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);

    // Kiểm tra trạng thái HTTP của phản hồi
    if (response.status === 204 || response.status === 401) {
      return response; // Trả về dữ liệu của phản hồi
    } else {
      console.error("Error  data:", response.status);
    }
  } catch (error) {
    return error.response;
    // Trả về null nếu có lỗi
  }
  return null;
};
export const putData = async (url, data) => {
  try {
    let token = Cookies.get("jwt");
    if (!token) {
      token = "";
    }
    console.log("Data to patch:", data);
    const response = await axios.put(
      import.meta.env.VITE_API_HOSTING + url,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
    if (response.status === 201 || response.status === 401) {
      return response;
    } else {
      console.error("Error  data:", response.status);
    }
  } catch (error) {
    return error.response;
    // Trả về null nếu có lỗi
  }
  return null;
};
