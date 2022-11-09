// IMPORTS:
import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

// CARD COMPONENT:
function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  // State-variables
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `place__delete-button ${
    isOwn ? "" : "place__delete-button_hidden"
  }`;
  const isLiked = card.likes.some((item) => item._id === currentUser._id);
  const cardLikeButtonClassName = `place__like-button ${
    isLiked ? "place__like-button_active" : ""
  }`;

  // Functions
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="place">
      <div
        style={{ backgroundImage: `url(${card.link})` }}
        className="place__image"
        onClick={handleClick}
      ></div>
      <div className="place__caption">
        <p className="place__caption-title">{card.name}</p>
        <div className="place__like-wrapper">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            aria-label="Поставить лайк."
          />
          <p className="place__likes-counter">{card.likes.length}</p>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        aria-label="Удалить карточку."
      />
    </article>
  );
}

export default Card;
