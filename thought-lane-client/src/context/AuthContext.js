"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axiosInstance.get("/me");
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      localStorage.removeItem("token");
    } finally {
      setUserLoaded(true);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials) => {
    const response = await axiosInstance.post("/login", credentials);
    localStorage.setItem("token", response.data.token);
    checkAuth();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, userLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
