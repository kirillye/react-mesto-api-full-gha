import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
import Spinner from "./Spinner.js";

function Main({
  isLoading,
  avatar,
  onCardLike,
  onCardRemove,
  cards,
  handleCardsChange,
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  handleCardClick,
  handleDeleteCard,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="person container">
        <div className="person__wrapper">
          <div className="person__info">
            <div
              className="person__image-cover"
              onClick={handleEditAvatarClick}
            >
              <img
                src={currentUser.avatar}
                alt="Аватар пользователя"
                className="person__avatar"
              />
            </div>
            <div className="person__box">
              <div className="person__name-row">
                <h1 className="person__title">{currentUser.name}</h1>
                <button
                  type="button"
                  className="person__btn-edit"
                  onClick={handleEditProfileClick}
                />
              </div>
              <h2 className="person__sub-title">{currentUser.about}</h2>
            </div>
          </div>
          <button
            type="button"
            className="person__add-article"
            onClick={handleAddPlaceClick}
          />
        </div>
      </section>
      <section className="articles container">
        {isLoading ? (
          <Spinner />
        ) : (
          <ul className="articles__grid">
            {cards.map((item) => (
              <Card
                key={item._id}
                onCardLike={onCardLike}
                onCardRemove={onCardRemove}
                onCardClick={handleCardClick}
                openAcceptPopup={handleDeleteCard}
                item={item}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default Main;
