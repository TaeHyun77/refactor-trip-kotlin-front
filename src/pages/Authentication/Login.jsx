import React from "react";
import Header from "../../components/header/Header";
import LoginForm from "../../form/login/LoginForm";

const Login = () => {
  return (
    <>
      <Header />
      <div className="container">
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
