import React, { FormEvent } from "react";
import { useAuth } from "context/auth";

export const LoginPage = () => {
  const { user, login, register } = useAuth();

  // HTMLFormElement extends Element
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    register({ username, password });
    // login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      {user ? <h1>Welcome back {user?.name}</h1> : null}
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id={"password"} />
      </div>
      <button type={"submit"}>Login</button>
    </form>
  );
};
