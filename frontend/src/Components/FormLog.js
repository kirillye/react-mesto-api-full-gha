import React from "react";
import { useState } from "react";

export default function FormLog({
  btnTextInfo,
  handleSubmit,
  handleChange,
  name,
  errorMessage,
}) {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  function handleUserEmailChange(event) {
    setUserEmail(event.target.value);
    handleChange(event);
  }

  function handleUserPasswordChange(event) {
    setUserPassword(event.target.value);
    handleChange(event);
  }

  return (
    <form
      onSubmit={handleSubmit}
      action="#"
      className="form-aut"
      name={name}
      noValidate=""
    >
      <input
        name="userEmail"
        placeholder="Email"
        type="email"
        className="form-aut__input"
        required
        value={userEmail}
        onChange={handleUserEmailChange}
      />
      <input
        name="userPassword"
        placeholder="Пароль"
        type="password"
        className="form-aut__input"
        required
        value={userPassword}
        onChange={handleUserPasswordChange}
      />
      <p className="form-aut__err-message">{errorMessage}</p>
      <button type="submit" className="form-aut__btn" onSubmit={handleSubmit}>
        {btnTextInfo}
      </button>
    </form>
  );
}
