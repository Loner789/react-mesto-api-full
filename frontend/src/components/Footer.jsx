// IMPORTS:
import React from "react";
import { useLocation } from "react-router-dom";

// FOOTER COMPONENT:
function Footer() {
  // Constants
  const location = useLocation();
  const isHidden =
    location.pathname === "/sign-in" || location.pathname === "/sign-up";

  return !isHidden ? (
    <footer className="footer footer_place_mesto">
      <p className="footer__copyright" lang="en">
        &copy;&nbsp;{new Date().getFullYear()} Mesto Russia
      </p>
    </footer>
  ) : null;
}

export default Footer;
