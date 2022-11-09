// IMPORTS:
import React, { useEffect } from "react";

// POPUP COMPONENT (COMMON WRAPPER FOR ALL POPUPS):
function Popup({ isOpen, name, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;

    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  // Functions:
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="popup__container-wrapper">
        {children}
        <button
          type="button"
          className="popup__container-discard"
          aria-label="Закрыть окно."
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default Popup;
