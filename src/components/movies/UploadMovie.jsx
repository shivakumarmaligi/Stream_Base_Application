import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "../authComponent/auth.module.css";
import Styles from "./movie.module.css";
import { storage, database } from "../../api/firebase";
import {
  ref as photoRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { v4 as movieID } from "uuid";

const UploadMovie = () => {
  let navigate = useNavigate();

  let [title, setTitle] = useState("");
  let [desc, setDesc] = useState("");
  let [genre, setGenre] = useState("");
  let [date, setDate] = useState("");
  let [ratings, setRatings] = useState("");
  let [lang, setLang] = useState("");
  let [cast, setCast] = useState("");
  let [photo, setPhoto] = useState("");
  let [video, setVideo] = useState("");
  let [loading, setLoading] = useState(false);

  let [progress, setProgress] = useState(0);
  let [barStatus, setBarStatus] = useState(false);

  let [id, setId] = useState(movieID());

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);

      let storageRefPhoto = photoRef(storage, `/movie-poster/${photo.name}`);
      let storageRefVideo = photoRef(storage, `/movie-video/${video.name}`);

      let uploadTaskPhoto = uploadBytesResumable(storageRefPhoto, photo);
      let uploadTaskVideo = uploadBytesResumable(storageRefVideo, video);
      // console.log({uploadTaskPhoto, uploadTaskVideo});

      // !Firebase Event

      uploadTaskVideo.on(
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
          let downloadUrlPhoto = await getDownloadURL(storageRefPhoto);
          let downloadUrlVideo = await getDownloadURL(storageRefVideo);
          setBarStatus(false);
          setLoading(false);

          // let value = {
          //   title,
          //   desc,
          //   genre,
          //   date,
          //   ratings,
          //   lang,
          //   cast,
          // };

          await set(ref(database, "movie-data/" + Date.now()), {
            // value,
            title,
            desc,
            genre,
            date,
            ratings,
            lang,
            cast,
            downloadUrlPhoto,
            downloadUrlVideo,
          });

          navigate("/");
          toast.success("successfully Movie Added");
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
          <p class="percent"> {Math.round(progress) + "%"}</p>
        </div>
      </div>
    );
  };

  return (
    <main id={Styles.movieBlock}>
      <header>
        <span>{barStatus === true ? <ProgressUI /> : ""}</span>
      </header>
      <aside className={Styles.movieArticle}>
        <h2
          style={{ color: "#ffc107", padding: "20px 0px", textAlign: "center" }}
        >
          Movie Details{" "}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className={styles.formLabel}>
              Title
            </label>
            <input
              type="text"
              id="title"
              className={styles.formControl}
              placeholder="Enter Movie Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre" className={styles.formLabel}>
              Genre
            </label>
            <select
              className={styles.formControl}
              onChange={e => setGenre(e.target.value)}
            >
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="horror">Horror</option>
              <option value="thriller">Thriller</option>
              <option value="romance">Romance</option>
              <option value="mystery">Mystery</option>
              <option value="Sci-fi">Sci-Fi</option>
              <option value="family">Family</option>
              <option value="kids">Kids</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="yop" className={styles.formLabel}>
              Year of Lanuch
            </label>
            <input
              type="date"
              id="yop"
              className={styles.formControl}
              placeholder="Enter Movie Year of Lancuh"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ratings" className={styles.formLabel}>
              Ratings
            </label>
            <input
              type="range"
              id="ratings"
              className={styles.formControl}
              placeholder="Enter the Rating from 0 to 5"
              min="0"
              max="5"
              value={ratings}
              onChange={e => setRatings(e.target.value)}
            />
          </div>
          <div className={styles.formDiv}>
            <label htmlFor="photo" className={styles.formLabel}>
              Movie Poster
            </label>
            <input
              type="file"
              id="photo"
              className={styles.formControl}
              onChange={e => setPhoto(e.target.files[0])}
            />
          </div>
          <div className={styles.formDiv}>
            <label htmlFor="video" className={styles.formLabel}>
              Movie Video
            </label>
            <input
              type="file"
              id="video"
              className={styles.formControl}
              onChange={e => setVideo(e.target.files[0])}
            />
          </div>
          <div className="form-group language">
            <label htmlFor="lang" className={styles.formLabel}>
              Language
            </label>
            <input
              type="text"
              id="lang"
              className={styles.formControl}
              placeholder="Enter Movie Language"
              value={lang}
              onChange={e => setLang(e.target.value)}
            />
          </div>
          <div className="form-group cast">
            <label htmlFor="cast" className={styles.formLabel}>
              Cast
            </label>
            <input
              type="text"
              id="lang"
              className={styles.formControl}
              placeholder="Enter The Movie Cast"
              value={cast}
              onChange={e => setCast(e.target.value)}
            />
          </div>
          <div className="form-group movie_description">
            <label htmlFor="desc" className={styles.formLabel}>
              Description
            </label>
            <textarea
              type="text"
              id="desc"
              className={styles.formControl}
              placeholder="Enter Movie Description"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className={styles.btn}>
              {loading ? "loading..." : "submit"}
            </button>
          </div>
        </form>
      </aside>
    </main>
  );
};

export default UploadMovie;

// import React, { useState } from "react";
// import styles from "./movie.module.css";
// import { database } from './../../api/firebase';
//const UploadMovie = () => {
//   let [title, setTitle] = useState("");
//   let [genre, setGenre] = useState("");
//   let [release, setRelease] = useState("");
//   let [desc, setDesc] = useState("");
//   let [language, setLanguage] = useState("");
//   let [poster, setPoster] = useState("");
//   let [video, setVideo] = useState("");
//   let [rating, setRating] = useState("");
//   let [cast, setCast] = useState("");
//   let [loading, setLoading] = useState(false);

//   let handleSubmit = e => {
//     e.preventDefault();
//     console.log(title);
//     console.log(genre);
//     console.log(release);
//     console.log(desc);
//     console.log(language);
//     console.log(poster);
//     console.log(video);
//     console.log(rating);
//     console.log(cast);
//   };
//   return (
//     <section id={styles.authSection}>
//       <article className={styles.authArticle}>
//         <h1 style={{ fontSize: "25px" }}>Upload movie</h1>
//         <div className={styles.formBlock}>
//           <form action="" className={styles.formForm} onSubmit={handleSubmit}>
//             <div className={styles.formDiv}>
//               <label htmlFor="name" className={styles.formLabel}>
//                 Movie Title
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 value={title}
//                 placeholder="Enter Movie Title"
//                 className={styles.formControl}
//                 onChange={e => setTitle(e.target.value)}
//               />
//             </div>
//             <div className={styles.formDiv}>
//               <label htmlFor="genre" className={styles.formLabel}>
//                 Movie Genre
//               </label>
//               <input
//                 type="text"
//                 id="genre"
//                 value={genre}
//                 placeholder="Enter Movie Catogery"
//                 className={styles.formControl}
//                 onChange={e => setGenre(e.target.value)}
//               />
//             </div>
//             <div className={styles.formDiv}>
//               <label htmlFor="year" className={styles.formLabel}>
//                 Movie Release Year
//               </label>
//               <input
//                 type="text"
//                 id="year"
//                 value={release}
//                 placeholder="Enter Release Date"
//                 className={styles.formControl}
//                 onChange={e => setRelease(e.target.value)}
//               />
//             </div>
//             <div className={styles.formDiv}>
//               <label htmlFor="desc" className={styles.formLabel}>
//                 Movie Description
//               </label>
//               <input
//                 type="text"
//                 id="desc"
//                 value={desc}
//                 placeholder="Enter Movie Description"
//                 className={styles.formControl}
//                 onChange={e => setDesc(e.target.value)}
//               />
//             </div>

//             <div className={styles.formDiv}>
//               <label htmlFor="language" className={styles.formLabel}>
//                 Movie Language
//               </label>
//               <input
//                 type="text"
//                 id="language"
//                 value={language}
//                 placeholder="Enter Movie language"
//                 className={styles.formControl}
//                 onChange={e => setLanguage(e.target.value)}
//               />
//             </div>
//             <div className={styles.formDiv}>
//               <label htmlFor="cast" className={styles.formLabel}>
//                 Movie Cast
//               </label>
//               <input
//                 type="text"
//                 id="cast"
//                 value={cast}
//                 placeholder="Enter Movie Cast"
//                 className={styles.formControl}
//                 onChange={e => setCast(e.target.value)}
//               />
//             </div>
//             <div className={styles.formDiv}>
//               <label htmlFor="photo" className={styles.formLabel}>
//                 Movie Poster
//               </label>
//               <input
//                 type="file"
//                 id="photo"
//                 className={styles.formControl}
//                 onChange={e => setPoster(e.target.files[0])}
//               />
//             </div>
//             <div className={styles.formDiv}>
//               <label htmlFor="video" className={styles.formLabel}>
//                 Movie Video
//               </label>
//               <input
//                 type="file"
//                 id="video"
//                 className={styles.formControl}
//                 onChange={e => setVideo(e.target.files[0])}
//               />
//             </div>
//             <div className={styles.formDiv}>
//               <label htmlFor="ratings" className={styles.formLabel}>
//                 Movie Ratings
//               </label>
//               <input
//                 type="range"
//                 id="ratings"
//                 min={0}
//                 max={5}
//                 value={rating}
//                 className={`${styles.formControl} ${styles.slide}`}
//                 onChange={e => setRating(e.target.value)}
//               />
//               <span>{rating}</span>
//             </div>
//             <div className={styles.formDiv} style={{ paddingTop: "30px" }}>
//               <button className={styles.btn}>
//                 {loading ? "loading..." : "submit"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </article>
//     </section>
//   );
// };

// export default UploadMovie;
