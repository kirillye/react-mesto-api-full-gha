import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  onCardLike,
  onCardRemove,
  onCardClick,
  openAcceptPopup,
  item,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = item.owner === currentUser._id;
  const isLiked = item.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `articles__icon-like ${
    isLiked && "articles__icon-like_active"
  }`;

  function handleClick() {
    onCardClick(item);
  }

  function handleLikeClick() {
    onCardLike(item);
  }

  function handleRemoveCard() {
    openAcceptPopup(item);
  }

  return (
    <li className="articles__item">
      {isOwn && (
        <button
          type="button"
          className="articles__icon-trush"
          onClick={handleRemoveCard}
        />
      )}
      <img
        src={item.link}
        alt={item.name}
        className="articles__image"
        onClick={handleClick}
      />
      <div className="articles__item-body">
        <h2 className="articles__title">{item.name}</h2>
        <div className="articles__likes-menu">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="articles__likes">{item.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
