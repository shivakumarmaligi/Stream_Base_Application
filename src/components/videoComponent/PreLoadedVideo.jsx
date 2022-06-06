import React, { Fragment, useRef, useState, useContext } from "react";
import VIDEO from "../videoComponent/arabic_kuthu.mp4";
import styles from "../videoComponent/video.module.css";
import { FaPlay, FaPause } from "react-icons/fa";
import { MovieContext } from "./../../api/MovieContext";
import { Link } from "react-router-dom";

const PreLoadedVideo = () => {
  let { Movies } = useContext(MovieContext);
  // console.log(Movies[0].movieVal.downloadUrlVideo);
  let videoRef = useRef();
  let [play, setPlay] = useState(true);

  let videoControls = () => {
    setPlay(!play);
    if (play) {
      videoRef.current.pause();
      videoRef.current.muted = true;
    } else {
      videoRef.current.play();
      videoRef.current.muted = false;
    }
  };

  return (
    <section id={styles.videoBlock}>
      {Movies.length > 0 && (
        <Fragment>
          <div className={styles.videoDesc}>
            <h2>{Movies[Movies.length - 1].movieVal.title} </h2>
            <p>Watch anywhere. Cancel anytime</p>
            <p>
              {Movies[Movies.length - 1].movieVal.desc.slice(0, 150) + "..."}
            </p>
            <p>
              <main onClick={videoControls}>
                {play ? (
                  <aside className={styles.videoAside}>
                    <FaPause className={styles.videoPlay} />
                    <span>Pause</span>
                  </aside>
                ) : (
                  <aside className={styles.videoAside}>
                    <FaPlay className={styles.videoPlay} />
                    <span>Play</span>
                  </aside>
                )}
                <Link to="/user/movie">watch now</Link>
              </main>
            </p>
          </div>
          <video
            ref={videoRef}
            src={Movies[Movies.length - 1].movieVal.downloadUrlVideo}
            className={styles.videoBlockPlayer}
            autoPlay
            muted
          ></video>
        </Fragment>
      )}
    </section>
  );
};

export default PreLoadedVideo;
