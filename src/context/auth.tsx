import React, { ReactNode, useState } from "react";

import { User } from "pages/project-list/search-panel";
import * as auth from "utils/auth-provider";
import { useMount } from "utils/hooks";
import { http } from "utils/http";
export interface AuthForm {
  username: string;
  password: string;
}

const boostrapUser = async () => {
  let user = undefined;
  const token = auth.getToken();
  if (token) {
    let res = await http("me", { token });
    user = res.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    boostrapUser().then(setUser);
  });

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
