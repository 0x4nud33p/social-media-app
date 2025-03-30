"use client";

import { createContext, useState, useContext, ReactNode } from "react";
import { UserType } from "@/types/types";

interface UserContextType {
  selectedUser: UserType | null;
  setSelectedUser: (user: UserType | null) => void;
  user? : UserType | null;
  setUser? : (user : UserType | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  return (
    <UserContext.Provider value={{ selectedUser, setSelectedUser, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext }