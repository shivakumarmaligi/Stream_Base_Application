import React, { useContext } from "react";
import { MovieContext } from "../../api/MovieContext";
import Movie from "./Movie";
import Spinner from './../../pages/spinner/Spinner';
import styles from "./movie.module.css";
const MovieSection = () => {
  let { Movies } = useContext(MovieContext);
  console.log(Movies);
  return (
    <section id={styles.movieBlock}>
      <article>
        {Movies.length === 0 || Movies === undefined
          ? <Spinner/>
          : Movies.map(movie => {
              return <Movie key={movie.id} {...movie} />;
            })}
      </article>
    </section>
  );
};

export default MovieSection;
