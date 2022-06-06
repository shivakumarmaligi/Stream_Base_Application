import React from "react";
import styles from "./movie.module.css";
import { useLocation } from "react-router-dom";
import MovieSection from "./MovieSection";
const MovieDetails = props => {
  let location = useLocation();
  let { movieVal } = location.state;
  let {
    title,
    id,
    cast,
    desc,
    lang,
    genre,
    date,
    ratings,
    downloadUrlPhoto,
    downloadUrlVideo,
  } = movieVal;

  return (
    <section id={styles.moviePlayer}>
      <article>
        <main>
          <div className={styles.videoPlayer}>
            <video src={downloadUrlVideo} controls autoPlay></video>
          </div>
          <div className={styles.videoDescription}>
            <h2>{title}</h2>
            <p>{desc}</p>
            <p>Language : {lang}</p>
            <p> Year : {date}</p>
            <p>{genre}</p>
            <p>Ratings : {ratings}</p>
            <p>Cast : {cast}</p>
          </div>
        </main>

        <footer>
          <MovieSection />
        </footer>
      </article>
    </section>
  );
};

export default MovieDetails;
