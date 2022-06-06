import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./auth.module.css";
import { auth } from "../../api/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const PasswordReset = () => {
  let navigate = useNavigate();

  let [email, setEmail] = useState("");
  let [loading, setLoading] = useState(false);

    let handleSubmit = async e => {
        e.preventDefault();
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast.info(
        `password reset email has been to your ${email} address and Please follow the intructions to reset your password`
      );
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <section id={styles.authSection}>
      <article className={styles.authArticle}>
        <h2 style={{ padding: "20px 0" }}>Login</h2>
        <div className={styles.formBlock}>
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
              <p className={styles.gotoAuth}>
                go back stream base
                <Link to="/login" className={styles.gotoAuthLink}>
                  login
                </Link>
              </p>
            </div>

            <div className="form-group">
              <button className={styles.btn}>
                {loading ? "loading..." : "Password Reset"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default PasswordReset;
