import React, { useContext } from "react";
import styles from "./myprofile.module.css";
import { FaCamera } from "react-icons/fa";
import { AuthContext } from "./../../api/AuthContext";
import Spinner from "../../pages/spinner/Spinner";
import { Link } from 'react-router-dom';
const MyAccount = () => {
  let USER = useContext(AuthContext);

  // let DoNotHardReaload = () => {
  //   window.location.reload === false;
  // }

  let ProfileUI = () => {
    console.log(USER);
    let { displayName, email, emailVerified, photoURL } = USER;
    return (
      <>
        <div className={styles.photoURL}>
          <aside className={styles.asideIcon}>
            <Link to="/user/upload-photo">
              <figure>
                <img
                  src={photoURL}
                  alt={displayName}
                  className={styles.photoURLImg}
                />
              </figure>
              <main>
                <span className={styles.cameraIcon}>
                  <FaCamera />
                </span>
              </main>
            </Link>
          </aside>
          <footer>
            <h2>{displayName}</h2>
          </footer>
        </div>
        <div className={styles.userInfo}>
          <aside>
            <p>{email}</p>
            <p>{emailVerified}</p>
          </aside>
        </div>
      </>
    );
  };
  return (
    <section>
      <article>{USER === null ? <Spinner /> : <ProfileUI />}</article>
    </section>
  );
};

export default MyAccount;
