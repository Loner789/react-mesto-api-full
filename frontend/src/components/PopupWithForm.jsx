//IMPORTS:
import React from "react";
import Popup from "./Popup";

// COMMON PART FOR ALL POPUPS WITH FORM:
function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
  hasCardToDelete,
  isValid
}) {

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <form
        action="#"
        className="popup__container"
        name={`${name}-form`}
        onSubmit={onSubmit}
        noValidate
      >
        <h2
          className={`popup__container-title ${
            hasCardToDelete
              ? "popup__container-title_place_card-deletion-popup"
              : ""
          }`}
        >
          {title}
        </h2>
        {children}
        <button
          type="submit"
          className="popup__container-submit"
          disabled={!isValid}
        >
          {buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
