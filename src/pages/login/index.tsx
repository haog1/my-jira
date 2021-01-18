import React, { useState } from "react";
import { RegisterPanel } from "./register";
import { LoginPanel } from "./login";

export const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div>
      {isRegister ? <RegisterPanel /> : <LoginPanel />}
      <button onClick={() => setIsRegister(!isRegister)}>
        Switch to {isRegister ? "Login" : "Register"}
      </button>
    </div>
  );
};
