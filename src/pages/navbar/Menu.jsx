import React, { useContext, useState, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./navbar.module.css";
import { FaUser, FaUpload } from "react-icons/fa";
import { AuthContext } from "../../api/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./../../api/firebase";
import { toast } from "react-toastify";
import { MdOutlineMovieFilter } from "react-icons/md";

const Menu = () => {
  let toggleRef = useRef();

  let [toggle, setToggle] = useState(false);

  let dropDownMenu = e => {
    setToggle(!toggle);
  };

  let USER = useContext(AuthContext);

  let LogOut = async () => {
    await signOut(auth);
    window.sessionStorage.removeItem("TOKEN");
    toast.success("Successfully Logged out");
    window.location.assign("/login");
  };

  let AuthenticatedUser = () => {
    return (
      <>
        {/* <li style={{ padding: "0 10px" }}>
          <NavLink
            to={{ pathname: "/user/movie" }}
            className={styles.navbarIconLink}
            id="uploadLink"
          >
            <span style={{ padding: "0px 10px" }}>
              <MdOutlineMovieFilter />
            </span>
            <span>Upload Movie</span>
          </NavLink>
        </li> */}
        <li onClick={dropDownMenu}>
          <NavLink to={{ pathname: "/" }} className={styles.navbarIconLink}>
            <span>
              <img
                src={USER.photoURL}
                alt={USER.displayName}
                className={styles.navbarIcon}
              />
            </span>
            <span>Profile</span>
          </NavLink>
          <div
            className={toggle === true ? "dropDown show" : "dropDown hide"}
            ref={toggleRef}
          >
            <ul>
              <li>
                <Link to="/user">
                  <span>
                    <FaUser />
                  </span>
                  My Profile
                </Link>
              </li>
              <li>
                <Link to={{ pathname: "/user/movie" }}>
                  <span style={{ padding: "0px 10px" }}>
                    <MdOutlineMovieFilter />
                  </span>
                  <span>Upload Movie</span>
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li>
          {/* <NavLink to={{ pathname: "/" }} className={styles.navbarAnchor}>
            Logout
          </NavLink> */}
          <a href="#" onClick={LogOut} className={styles.navbarAnchor}>
            Logout
          </a>
        </li>
      </>
    );
  };
  let AnonymousUser = () => {
    return (
      <>
        <li>
          <NavLink
            to={{ pathname: "/login" }}
            activeclassname="active"
            className={styles.navbarAnchor}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to={{ pathname: "/signup" }}
            activeclassname="active"
            className={styles.navbarAnchor}
          >
            Signup
          </NavLink>
        </li>
      </>
    );
  };
  return (
    <div className={styles.menu}>
      <ul>
        <li>
          <NavLink
            to={{ pathname: "/" }}
            activeclassname="active"
            className={styles.navbarAnchor}
          >
            Home
          </NavLink>
        </li>
        {USER ? <AuthenticatedUser /> : <AnonymousUser />}
      </ul>
    </div>
  );
};

export default Menu;
