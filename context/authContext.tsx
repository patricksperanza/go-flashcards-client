"use client";
import { createContext, useEffect, useState } from "react";
import { AuthContextType, GCResponse, User, Credentials } from "@/types";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = localStorage.getItem("user");
  const [currentUser, setCurrentUser] = useState<User | null>(
    typeof user === "string" ? JSON.parse(user) : null
  );

  const login = async (inputs: Credentials) => {
    const result = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(inputs),
    });

    const response: GCResponse<User> = await result.json();
    if (!response.IsOK) {
      return response;
    }
    setCurrentUser({ ...response.Payload });
    return response;
  };

  const logout = () => {
    // todo psperanza
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
