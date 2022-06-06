import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./auth.module.css";
import { auth } from "../../api/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
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
      let userData = await signInWithEmailAndPassword(auth, email, password);
      if (userData.user.emailVerified === true) {
        toast.success("successfully user logged in");
        navigate("/");
      } else {
        navigate("/login");
        toast.error(`user not yet verified`);
      }
    } catch (error) {
      toast.error(error.message.slice(9));
    }
    setLoading(false);
    setEmail("");
    setPassword("");
  };

  return (
    <section id={styles.authSection}>
      <article className={styles.authArticle}>
        <h2 style={{ padding: "20px 0" }}>Login</h2>
        <div className={styles.formBlock}>
          <Link to="/phone-auth">Try With Phone Number</Link>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="" className={styles.formLabel}>
                email
              </label>
              <input
                type="email"
                className={styles.formControl}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="" className={styles.formLabel}>
                password
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
                new to stream base
                <Link to="/signup" className={styles.gotoAuthLink}>
                  singup
                </Link>
              </p>
              <p
                style={{
                  clear: "both",
                  padding: "3px 0",
                }}
              >
                <Link to="/password-reset" className={styles.gotoAuthLink}>
                  forgot password
                </Link>
              </p>
            </div>

            <div className="form-group">
              <button className={styles.btn}>
                {loading ? "loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default Login;
