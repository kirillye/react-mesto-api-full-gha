import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup({ card, onClose, isOpen }) {
  usePopupClose(card.link, onClose);

  if (card && card.link) {
    return (
      <div
        className={`popup-image popup popup_type_image ${
          isOpen ? "popup_opend" : ""
        }`}
      >
        <div className="popup-image__container">
          <button
            type="button"
            onClick={onClose}
            className="popup-image__btn-close popup__btn-close"
          />
          <img
            src={card.link}
            alt={card.name}
            className="popup__image popup-image__img"
          />
          <figcaption className="popup__figcaption">{card.name}</figcaption>
        </div>
      </div>
    );
  } else {
    return;
  }
}

export default ImagePopup;
