
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for the user ID in cookies when initializing
    const userId = Cookies.get("userId");
    if (userId) {
      setIsAuthenticated(true);
      setUser(userId);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("userId");
    setIsAuthenticated(false);
    setUser(null);
  };

  //active links

  const [activeButton, setActiveButton] = useState(0); // State to track active button

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        setActiveButton,
        activeButton,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
