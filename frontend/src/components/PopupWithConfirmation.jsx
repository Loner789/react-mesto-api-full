// IMPORTS:
import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithConfirmation({ isOpen, isLoading, onClose, onSubmit, card }) {
  // Functions:
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(card);
  };

  return (
    <PopupWithForm
      name="confirmation-popup"
      title="Вы уверены?"
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Удаление..." : "Да"}
      hasCardToDelete={card}
      isValid={true}
    />
  );
}

export default PopupWithConfirmation;
