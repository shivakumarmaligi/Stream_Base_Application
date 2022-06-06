import React, { useState, useContext } from "react";
import styles from "../authComponent/auth.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { updatePassword } from "firebase/auth";
import { AuthContext } from "../../api/AuthContext";
import { useNavigate } from "react-router-dom";

const UpdatePaswword = () => {
  let USER = useContext(AuthContext);

  let navigate = useNavigate();

  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [toggle, setToggle] = useState(false);
  let [PasswordShow, setPasswordShow] = useState(false);

  let changeIcon = () => {
    setToggle(!toggle);
    setPasswordShow(!PasswordShow);
  };

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      await updatePassword(USER, password);
      toast.success("successfully password updated");
      navigate("/user");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
    setPassword("");
  };

  return (
    <section id={styles.authSection}>
      <article className={styles.authArticle}>
        <h2 style={{ padding: "20px 0" }}>Update Password</h2>
        <div className={styles.formBlock}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="" className={styles.formLabel}>
                New Password
              </label>
              <input
                type={PasswordShow !== true ? "password" : "text"}
                className={styles.formControl}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <span className={styles.eyeIcon} onClick={changeIcon}>
                {toggle !== true ? (
                  <FaEyeSlash className={styles.eyeIconSvg} />
                ) : (
                  <FaEye className={styles.eyeIconSvg} />
                )}
              </span>
            </div>
            <div className="form-group">
              <p className={styles.gotoAuth}>
                Back to my profile
                <Link to="/user" className={styles.gotoAuthLink}>
                  go back
                </Link>
              </p>
            </div>

            <div className="form-group">
              <button className={styles.btn}>
                {loading ? "loading..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default UpdatePaswword;
