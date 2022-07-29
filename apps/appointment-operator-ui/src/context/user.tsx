import React, { createContext, FunctionComponent, PropsWithChildren, useState } from "react";

import { OperatorJwtTokenPayload } from "@monobox/appointment-contract";

type UserContextValue = {
  user: OperatorJwtTokenPayload | null;
  setUser: (user: OperatorJwtTokenPayload) => void;
};

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => void 0,
});

export const UserProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<OperatorJwtTokenPayload | null>(null);

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
