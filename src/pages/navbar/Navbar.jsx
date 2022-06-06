import React from "react";
import Styles from "./navbar.module.css";
import Logo from "./Logo";
import Menu from "./Menu";
import { useLocation } from "react-router-dom";
import styles from "./navbar.module.css";
const Navbar = () => {
  let location = useLocation();



  return (
    <section
      id={Styles.navbarBlock}
      className={location.pathname === "/" ? styles.homeClass : ""}
    >
      <article className={Styles.navArticle}>
        <Logo />
        <Menu />
      </article>
    </section>
  );
};

export default Navbar;
