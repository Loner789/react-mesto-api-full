// IMPORTS:
import React from "react";
import Popup from "./Popup";

// INFO-TOOLTIP COMPONENT:
function InfoTooltip({ isOpen, imgPath, title, onClose }) {
  return (
    <Popup isOpen={isOpen} name="tooltip" onClose={onClose}>
      <div className="popup__container popup__container_type_tooltip">
        <div
          className="popup__container-img"
          style={{ backgroundImage: `url(${imgPath})` }}
        ></div>
        <h2 className="popup__container-title popup__container-title_place_tooltip">
          {title}
        </h2>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
