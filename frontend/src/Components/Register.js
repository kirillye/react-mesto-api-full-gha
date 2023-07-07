import React, { useState } from "react";
import FormLog from "./FormLog";
import { Link, useNavigate } from "react-router-dom";

export default function Register({ handleRegister }) {
  const [formValue, setFormValue] = useState({
    userEmail: "",
    userPassword: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.userEmail || !formValue.userPassword) {
      return;
    }
    handleRegister(formValue)
      .then((res) => {
        if (typeof res && res?.includes("Ошибка")) {
          return;
        }
        setFormValue({ userEmail: "", userPassword: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main>
      <section className="login container">
        <h1 className="login__title">Регистрация</h1>
        <FormLog
          btnTextInfo="Зарегистрироваться"
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        ></FormLog>
        <button className="login__redirect" type="button">
          <Link to="/sign-in" className="main-menu__item-link">
            Уже зарегистрированы? Войти
          </Link>
        </button>
      </section>
    </main>
  );
}
