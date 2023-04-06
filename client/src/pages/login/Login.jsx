import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { login } from "../../api/authen";

const Login = () => {
  const [telOrEmail, setTelOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = ({ event }) => {
    event.preventDefault();
    login({ telOrEmail, password }).then(({ status, body }) => {
      if (status !== 200) {
        alert("Login failed");
        return;
      }
      const { user, authToken } = body;
      const { id, email, tel, name } = user;
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("userId", id);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userTel", tel);
      localStorage.setItem("userTel", tel);
      localStorage.setItem("userName", name);

      if (localStorage.getItem("authToken") === authToken) {
        navigate("/chat");
      }
    });
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h1>Login</h1>
        <div className="login-input">
          <label>Tel or Email</label>
          <input type="text" onChange={(event) => setTelOrEmail(event.target.value)} />
        </div>
        <div className="login-input">
          <label>Password</label>
          <input type="password" onChange={(event) => setPassword(event.target.value)} />
        </div>
        <div className="login-interact">
          <a href="/register">register</a>
          <button onClick={(event) => handleLogin({ event })}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
