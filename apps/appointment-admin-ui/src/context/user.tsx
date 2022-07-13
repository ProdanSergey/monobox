import React, { createContext, FunctionComponent, PropsWithChildren, useState } from "react";
import { User } from "../shared/domain/user";

type UserContextValue = {
  user: User | null;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => void 0,
});

export const UserProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: (user) => setUser(user),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
