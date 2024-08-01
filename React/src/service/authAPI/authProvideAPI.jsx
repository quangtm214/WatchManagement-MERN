import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { postData, patchData } from "../fetchAPI";
import { jwtDecode } from "jwt-decode";
import { Spin } from "antd";
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokenStored = Cookies.get("jwt");
    if (tokenStored) {
      const decodedToken = jwtDecode(tokenStored);
      setUser(decodedToken);
    }
    setIsLoading(false);
  }, []);

  const login = async (name, password) => {
    const response = await postData("/accessrouter/login", {
      membername: name,
      password: password,
    });
    console.log("response", response);
    if (response && response.data) {
      const token = response.data.metadata.tokens.accesstoken;
      console.log(token);
      if (token) {
        Cookies.set("jwt", token, { expires: 60 });
        const decodedToken = jwtDecode(token);
        console.log("decodedToken", decodedToken);
        Cookies.set("client-id", decodedToken.userId, { expires: 60 });
        setUser(decodedToken);
        return decodedToken;
      }
      // setUser({ userName: data.userName, avatar: data.avatar });
    }
    return null;
  };

  const changePass = async (oldPassword, newPassword) => {
    const response = await patchData("/auth/personal/changePassword", {
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
    if (response.data.status === "fail") {
      return response.data;
    }
    console.log("response", response);
    if (response.status === 201 && response.data) {
      const token = response.data.data.token;
      console.log(token);
      if (token) {
        Cookies.set("jwt", token, { expires: 60 });
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
        return response.data;
      }
      return "success";
    }
    return null;
  };

  const logout = async () => {
    const response = await postData("/accessrouter/logout", {});
    await setIsLoading(true);
    await new Promise((resolve) => {
      setUser(null);
      resolve();
    });
    await new Promise((resolve) => {
      Cookies.remove("jwt");
      resolve();
    });
    await setIsLoading(false);
    if (!user) {
      return user;
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <AuthContext.Provider value={{ user, login, logout, changePass }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthContext;
