import React from "react";

import PopupWithForm from "./PopupWithForm";

import { useState, useEffect } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({
  checkField,
  isLoadingForm,
  onUpdateUser,
  isOpen,
  onClose,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [nameFieldError, setNameFieldError] = useState({
    falidField: true,
    textError: "",
  });

  const [aboutFieldError, setAboutFieldError] = useState({
    falidField: true,

    textError: "",
  });

  const currentUser = React.useContext(CurrentUserContext);
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  function handleClosePopup() {
    onClose();
    setNameFieldError({ textError: "", falidField: true });
    setAboutFieldError({ textError: "", falidField: true });
  }

  function check() {
    if (!nameFieldError.falidField || !aboutFieldError.falidField) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    check();
  }, [currentUser]);

  useEffect(() => {
    check();
  }, [nameFieldError.falidField, aboutFieldError.falidField]);

  return (
    <PopupWithForm
      formValid={formValid}
      isLoadingForm={isLoadingForm}
      title="Редактировать профиль"
      name="form-user"
      isOpen={isOpen}
      onClose={handleClosePopup}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__items">
        <div className="form__item">
          <input
            name="userName"
            value={name || ""}
            onChange={(e) => {
              checkField(e, 2, 40, setNameFieldError);
              setName(e.target.value);
            }}
            type="text"
            className="popup__input popup__input_content_name"
            required=""
            minLength={2}
            maxLength={40}
          />

          <span className="popup__form-item-error popup__form-item-error_field_userName">
            {nameFieldError.textError}
          </span>
        </div>

        <div className="form__item">
          <input
            name="userJob"
            value={description || ""}
            onChange={(e) => {
              setDescription(e.target.value);
              checkField(e, 2, 200, setAboutFieldError);
            }}
            type="text"
            className="popup__input popup__input_content_job"
            required=""
            minLength={2}
            maxLength={200}
          />

          <span className="popup__form-item-error popup__form-item-error_field_userJob">
            {aboutFieldError.textError}
          </span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}
