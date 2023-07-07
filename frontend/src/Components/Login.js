import React, { useState } from "react";
import FormLog from "./FormLog";

export default function Login({ handleLogin }) {
  const [formValue, setFormValue] = useState({
    userEmail: "",
    userPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formValue)
      .then((res) => {
        if (typeof res && res?.includes("Ошибка")) {
          return;
        }
        setFormValue({ userEmail: "", userPassword: "" });
      })
      .catch((err) => {
        if (err === "Ошибка: 401") {
          return setErrorMessage("Логин или пароль не верен");
        }
        setErrorMessage(err);
      });
  };

  return (
    <main>
      <section className="login container">
        <h1 className="login__title">Вход</h1>
        <FormLog
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          btnTextInfo="Войти"
          errorMessage={errorMessage}
        ></FormLog>
      </section>
    </main>
  );
}
