import React from "react";

export default function InfoTooltip({
  isSeccessfull,
  iconSeccessfull,
  badIcon,
  isOpen,
  onClose,
}) {
  return (
    <div className={`popup ${isOpen ? "popup_opend" : ""} popup-info`}>
      <div className="popup__container popup__container_align_center">
        <button type="button" className="popup__btn-close" onClick={onClose} />
        <img
          src={isSeccessfull ? iconSeccessfull : badIcon}
          alt="иконка"
          className="popup__status-image"
        />
        <h2 className="popup__title popup-info__title">
          {isSeccessfull
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}
