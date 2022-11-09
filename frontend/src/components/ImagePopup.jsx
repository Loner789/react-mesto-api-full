//IMPORTS:
import React from "react";
import Popup from "./Popup";

// IMAGE-POPUP COMPONENT:
function ImagePopup({ card, onClose }) {
  return (
    <Popup isOpen={card} name="image-popup" onClose={onClose}>
      <div className="popup__figure">
        <img
          src={card?.link}
          alt={card ? `Фото ${card.name}.` : ""}
          className="popup__image"
        />
        <p className="popup__image-caption">{card?.name}</p>
      </div>
    </Popup>
  );
}

export default ImagePopup;
