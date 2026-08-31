import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { baseUrl } from "../../apiConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const setAuthenticated = (value) => {
    setIsAuthenticated(value);
  };

  const checkAuth = async () => {
    console.log("Checking authentication...");

    try {
      const response = await axios.get(
        `${baseUrl}/api/user/check-auth`,
        {
          withCredentials: true,
        }
      );

      console.log("Authentication response:", response.data);

      if (response.status === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log("Authentication failed:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${baseUrl}/api/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log("Logout error:", error);
    }

    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        checkAuth,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};