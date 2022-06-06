import React from "react";
import styles from "./movie.module.css";
import { AiFillStar } from "react-icons/ai";
import { RiUser5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Movie = props => {
  const totalStars = 5;

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
  } = props.movieVal;
  return (
    <main className="col-4">
      <div>
        <header>
          <a href="/">
            <img src={downloadUrlPhoto} alt={title} />
          </a>
        </header>
        <aside>
          <h2>{title}</h2>
          <p className={styles.rating_cast}>
            <span className={styles.movieContent}>
              <li>{lang}</li>
              <li>{genre}</li>
            </span>
            <span className={styles.ratingBlock}>
              {[...new Array(totalStars)].map((arr, index) => {
                return index < ratings ? (
                  <AiFillStar style={{ color: "#ffc107" }} />
                ) : (
                  <AiFillStar />
                );
              })}
            </span>
          </p>
          <p className={styles.movie_desc}>{desc.slice(0, 30) + "..."}</p>
          <p className={styles.cast_block}>
            <span>
              <RiUser5Fill />
            </span>
            <span>{cast}</span>
          </p>
        </aside>
        <footer className={styles.movie_footer}>
          <Link to={{ pathname: `/${title}/${id}` }} state={{...props}}>
            Watch now
          </Link>
        </footer>
      </div>
    </main>
  );
};

export default Movie;
