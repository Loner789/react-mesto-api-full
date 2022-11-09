// IMPORTS:
import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

// MAIN COMPONENT:
function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  // Context
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile profile_place_mesto">
        <div
          className="profile__img-wrapper"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        ></div>
        <div className="profile__info">
          <div className="profile__info-wrapper">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="Редактировать профиль."
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="Добавить фото."
          onClick={onAddPlace}
        />
      </section>
      <section
        className="places places_place_mesto"
        aria-label="Блок с фото мест."
      >
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
