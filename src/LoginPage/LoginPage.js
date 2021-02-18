import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <div className="LoginPage">
      <h2>Welcome Back!</h2>
      <LoginForm />
    </div>
  );
}
