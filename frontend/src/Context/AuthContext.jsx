import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);
  const apiurl = import.meta.env.VITE_BACKEND_API;
  useEffect(() => {
    const checkuserstatus = async () => {
      try {
        const getuserendpoint = `${apiurl}/api/user/getuser`;
        const response = await fetch(getuserendpoint, {
          credentials: "include",
        });
        if (response.ok) {
          const userdata = await response.json();
          setuser(userdata);
        }
      } catch (err) {
        console.error("couldn't fetch user status", err);
      } finally {
        setloading(false);
      }
    };
    checkuserstatus();
  }, [apiurl]);

  const login = async (Email, Password) => {
    try {
      const loginendpoint = `${apiurl}/api/auth/login`;
      const loginresponse = await fetch(loginendpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email, Password }),
        credentials: "include",
      });
      const data = await loginresponse.json();
      if (!loginresponse.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }
      setuser(data);
    } catch (error) {
      console.error("An error occurred in the login process:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const logoutendpoint = `${apiurl}/api/auth/logout`;
      await fetch(logoutendpoint, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setuser(null);
    }
  };
  const value = { user, login, logout, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
