import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./auth.module.css";
import { auth } from "../../api/firebase";
import { useNavigate, Link } from "react-router-dom";
import md5 from "md5";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";

const Signup = () => {
  let navigate = useNavigate();

  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [loading, setLoading] = useState(false);

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        toast.error(`Password is Not Match`);
      } else {
        // console.log({ username, email, password });
        let userData = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast.success(`Successfully Signed Up`);
        // console.log(userData);
        let confirmationEmail = `verification mail has been sent to ${email} address and please verfiy it`;
        let user = userData.user;
        sendEmailVerification(user);
        updateProfile(user, {
          photoURL: `http://www.gravatar.com/avatar/${md5(email)}q=identicon}`,
          displayName: username,
        });
        navigate("/login");
        toast.info(confirmationEmail);
        console.log(user);
      }
    } catch (error) {
      toast.error(error.message.slice(9));
    }
    setLoading(false);
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <section id={styles.authSection}>
      <article className={styles.authArticle}>
        <h2 style={{ padding: "10px 0" }}>Signup</h2>
        <div className={styles.formBlock}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="" className={styles.formLabel}>
                username
              </label>
              <input
                type="text"
                className={styles.formControl}
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
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
                type="password"
                className={styles.formControl}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="" className={styles.formLabel}>
                confirm password
              </label>
              <input
                type="password"
                className={styles.formControl}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <p className={styles.gotoAuth}>
                Already have an account
                <Link to="/login" className={styles.gotoAuthLink}>
                  Login
                </Link>
              </p>
            </div>
            <div className="form-group">
              <button className={styles.btn}>
                {loading ? "loading..." : "Sign up"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default Signup;
