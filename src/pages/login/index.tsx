import React, { useState } from "react";

import { LoginPanel } from "./login";
import { RegisterPanel } from "./register";

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
