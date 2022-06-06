import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./auth.module.css";
import { auth } from "../../api/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const PhoneAuth = () => {
  let navigate = useNavigate();

  let [phone, setPhone] = useState("");
  let [loading, setLoading] = useState(false);

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      let recaptchaVerifier = new RecaptchaVerifier(
        "captcha-container",
        {
          size: "invisible",
          callback: response => {
            // reCAPTCHA solved, allow sigInWithPhoneNumber
          },
        },
        auth
      );

      // ! send OTP
      let sendOTP = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
      let confirmationMessage = window.prompt("Enter the OTP");
      await sendOTP.confirm(confirmationMessage);
      toast.success("successfully logged in");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <section id={styles.authSection}>
      <article className={styles.authArticle}>
        <h2 style={{ padding: "20px 0" }}>Sign In with Phone Number</h2>
        <div className={styles.formBlock}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="phone" className={styles.formLabel}>
                Phone Number
              </label>
              <input
                type="text"
                className={styles.formControl}
                value={phone}
                onChange={e => setPhone(e.target.value)}
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
            <div id="captcha-container"></div>
            <div className="form-group">
              <button className={styles.btn}>
                {loading ? "loading..." : "Send OTP"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default PhoneAuth;
