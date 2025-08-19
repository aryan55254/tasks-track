import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const checkuserstatus = async () => {
      try {
        const response = await fetch("", { credentials: "include" });
        if (response.ok) {
          const userdata = await response.json();
          setuser(userdata);
        }
      } catch (err) {
        console.error("couldn't fetch user status");
      } finally {
        setloading(false);
      }
    };
  }, []);

  const login = async (Email, Password) => {
    try {
      const loginresponse = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email, Password }),
        credentials: "include",
      });

      if (!loginresponse.ok) {
        const errordata = await loginresponse.json();
        console.error("Login Api failed", errordata.message);
        throw new Error(errordata.message || "Login failed");
      }
      const userResponse = await fetch("", { credentials: "include" });
      const userData = await userResponse.json();

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data after login.");
      }

      setuser(userData);
    } catch (error) {
      console.error("An error occurred in the login process:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch("", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setuser(null);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
