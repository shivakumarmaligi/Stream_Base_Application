import React, { useState, useContext } from "react";
import styles from "../authComponent/auth.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { storage, auth } from "../../api/firebase";
import {
  ref as photoRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../api/AuthContext";

const UploadProfilePhoto = () => {
  let USER = useContext(AuthContext);

  let [loading, setLoading] = useState(false);
  let [photo, setPhoto] = useState("");
  let [progress, setProgress] = useState(0);
  let [barStatus, setBarStatus] = useState(false);

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);

      let storageRef = photoRef(storage, `/profile-photo/${photo.name}`);
      let uploadTask = uploadBytesResumable(storageRef, photo);
      console.log(uploadTask);

      // !Firebase Event

      uploadTask.on(
        "state_changed",
        snapShot => {
          // ? Progressing upload photo snaps
          let progressBar =
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
          setProgress(progressBar);
          setBarStatus(true);
          setLoading(true);
        },
        err => {
          console.log(err);
        },
        async () => {
          // ? Completion Task
          let downloadUrl = await getDownloadURL(storageRef);
          updateProfile(USER, {
            photoURL: downloadUrl,
          });
          setBarStatus(false);
          setLoading(false);
          toast.success(`Successfully photo updated`);
          window.location.assign("/");
        }
      );
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  let ProgressUI = () => {
    return (
      <div class="progress">
        <div class="bar" style={{ width: `${progress}%` }}>
          <p class="percent"> {Math.round(progress)}</p>
        </div>
      </div>
    );
  };

  return (
    <section id={styles.authSection}>
      <header>
        <span>{barStatus === true ? <ProgressUI /> : ""}</span>
      </header>
      <article className={styles.authArticle}>
        <h2 style={{ padding: "20px 0" }}>Update Profile Photo</h2>
        <div className={styles.formBlock}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="photo" className={styles.formLabel}>
                Upload Photo
              </label>
              <input
                type="file"
                id="photo"
                className={styles.formControl}
                onChange={e => setPhoto(e.target.files[0])}
              />
            </div>
            <div className="form-group">
              <p className={styles.gotoAuth}>
                Go back to Profile Page
                <Link to="/user" className={styles.gotoAuthLink}>
                  go back
                </Link>
              </p>
            </div>

            <div className="form-group">
              <button className={styles.btn}>
                {loading ? "loading..." : "Upload Photo"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default UploadProfilePhoto;
