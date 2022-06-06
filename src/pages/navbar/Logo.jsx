import React from "react";
import { FaPhotoVideo } from "react-icons/fa";
import Styles from "../navbar/navbar.module.css";
const Logo = () => {
  return (
    <div className="logoBlock">
      <a href="#" className={Styles.logoBlockAnchor}>
        <span>
          <FaPhotoVideo className={Styles.logoBlockSpanIcon} />
        </span>
        <span>Stream Base</span>
      </a>
    </div>
  );
};

export default Logo;
