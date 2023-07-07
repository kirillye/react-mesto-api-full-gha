import React from "react";
import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  checkLink,
  isLoadingForm,
  onUpdateAvatar,
  isOpen,
  onClose,
}) {
  const [avatarLink, setAvatarLink] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [linkFieldError, setLinkFieldError] = useState({
    falidField: false,
    textError: "",
  });

  function handleClosePopup() {
    onClose();
    handleResetForm();
  }

  function handleResetForm() {
    setAvatarLink("");
    setLinkFieldError({ textError: "", falidField: false });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarLink);
  }

  useEffect(() => {
    if (linkFieldError.falidField) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [linkFieldError.falidField]);

  return (
    <PopupWithForm
      formValid={formValid}
      isLoadingForm={isLoadingForm}
      title="Обновить аватар"
      name="form-avatar"
      isOpen={isOpen}
      onClose={handleClosePopup}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__items">
        <div className="form__item">
          <input
            name="userLinkImage"
            placeholder="Ссылка на картинку"
            type="url"
            className="popup__input"
            id="popup__user-link-avatar"
            required
            value={avatarLink}
            onChange={(e) => {
              setAvatarLink(e.target.value);
              checkLink(e, setLinkFieldError);
            }}
          />
          <span className="popup__form-item-error popup__form-item-error_field_userLinkImage">
            {linkFieldError.textError}
          </span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}
