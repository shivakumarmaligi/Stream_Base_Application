import React from "react";
import styles from "./myprofile.module.css";
import SidebarMenu from "./SidebarMenu";
import MainProfile from "./MainProfile";
import { Outlet } from "react-router-dom";
const MyProfile = () => {
  return (
    <section>
      <article className={styles.profileBlock}>
        <div className={styles.sidebarMenu}>
          <SidebarMenu />
        </div>
        <div className={styles.mainProfile}>
          <MainProfile />
          
        </div>
      </article>
    </section>
  );
};

export default MyProfile;
