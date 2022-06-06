import React, { useContext } from "react";
import MyAccount from "./MyAccount";
import { Link } from "react-router-dom";
import { MdOutlineAccountCircle, MdUploadFile } from "react-icons/md";
import styles from "./myprofile.module.css";
import { TiUserDelete } from "react-icons/ti";
import { AuthContext } from "../../api/AuthContext";
import { deleteUser } from "firebase/auth";
import { MdMovieFilter, MdOutlineAddPhotoAlternate } from "react-icons/md";

const SidebarMenu = () => {
  let USER = useContext(AuthContext);

  let removeAccount = async () => {
    let deletedUser = await deleteUser(USER);
    if (window.prompt(`Are you sure ?  Confirm to Delete An Account`)) {
      window.sessionStorage.removeItem("TOKEN");
      window.location.assign("/signup");
      return deletedUser;
    }
  };

  return (
    <div className={styles.SidebarMenu}>
      <ul>
        <li>
          <Link
            to="/user"
            style={{
              background: "#333",
              color: "#fff",
              fontWeight: "bold",
              textTransform: "uppercase",
              borderBottom: "3px solid #ffc107",
            }}
          >
            Account Settings
          </Link>
        </li>
        <li>
          <span>
            <Link to="/user/my-account">
              <span>
                <MdOutlineAccountCircle />
              </span>
              <span>My Account</span>
            </Link>
          </span>
        </li>
        <li>
          <span>
            <Link to="/user/upload-photo">
              <span>
                <MdOutlineAddPhotoAlternate />
              </span>
              <span>Upload Photo</span>
            </Link>
          </span>
        </li>
        <li>
          <span>
            <Link to="/user/update-password">
              <span>
                <MdUploadFile />
              </span>
              <span>Update Password</span>
            </Link>
          </span>
        </li>
        <li>
          <Link
            to="/user/movie"
            style={{
              background: "#333",
              color: "#fff",
              fontWeight: "bold",
              textTransform: "uppercase",
              borderBottom: "3px solid #ffc107",
            }}
          >
            Movies
          </Link>
        </li>
        <li>
          <span>
            <Link to="/user/movie/upload-movie">
              <span>
                <MdMovieFilter />
              </span>
              <span>Upload Movie</span>
            </Link>
          </span>
        </li>
        <li className="lastChild_removeAccount" onClick={removeAccount}>
          <span>
            <a to="/signup">
              <span>
                <TiUserDelete />
              </span>
              <span>Remove Account</span>
            </a>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
