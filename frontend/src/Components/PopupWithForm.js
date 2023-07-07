import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm({
  formValid,
  isLoadingForm,
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  buttonText = "Сохранить",
  buttonTextLoadingForm = "Сохранение...",
  children,
}) {
  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opend" : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__btn-close" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          action="#"
          className="popup__form form"
          name={name}
          noValidate=""
        >
          {children}
          <button
            type="submit"
            className={`popup__btn ${
              isLoadingForm || formValid ? "popup__btn_disable" : ""
            }`}
            disabled={isLoadingForm || formValid ? true : false}
          >
            {isLoadingForm ? buttonTextLoadingForm : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
