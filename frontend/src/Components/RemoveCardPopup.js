import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function RemoveCardPopup({
  isLoadingForm,
  card,
  onDeleteCard,
  isOpen,
  onClose,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm
      isLoadingForm={isLoadingForm}
      title="Вы уверены ?"
      name="accept"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonTextLoadingForm="Удаляю..."
    />
  );
}
