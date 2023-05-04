import React, { useState } from "react";
import "./register.scss";
import { register } from "../../api/authen";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [registerUser, setRegisterUser] = useState({ name: "", password: "", repeatPassword: "", email: "", tel: "" });

  const handleTypeRegister = ({ name, password, repeatPassword, email, tel }) => {
    const newName = name || registerUser.name;
    const newPassword = password || registerUser.password;
    const newRepeatPassword = repeatPassword || registerUser.repeatPassword;
    const newEmail = email || registerUser.email;
    const newTel = tel || registerUser.tel;
    setRegisterUser({
      ...registerUser,
      name: newName,
      password: newPassword,
      repeatPassword: newRepeatPassword,
      email: newEmail,
      tel: newTel,
    });
  };

  const handleRegister = async ({ event }) => {
    event.preventDefault();
    const { status, body } = await register(registerUser);
    if (status === 200) {
      navigate("/login");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form">
        <h1>Register</h1>
        <div className="register-input">
          <label>name</label>
          <input type="text" onChange={(event) => handleTypeRegister({ name: event.target.value })} />
        </div>
        <div className="register-input">
          <label>tel</label>
          <input type="tel" onChange={(event) => handleTypeRegister({ tel: event.target.value })} />
        </div>
        <div className="register-input">
          <label>email</label>
          <input type="email" onChange={(event) => handleTypeRegister({ email: event.target.value })} />
        </div>
        <div className="register-input">
          <label>password</label>
          <input type="password" onChange={(event) => handleTypeRegister({ password: event.target.value })} />
        </div>
        <div className="register-input">
          <label>repeat password</label>
          <input type="password" onChange={(event) => handleTypeRegister({ repeatPassword: event.target.value })} />
        </div>
        <div className="register-interact">
          <a href="/login">login</a>
          <button onClick={(event) => handleRegister({ event })}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
