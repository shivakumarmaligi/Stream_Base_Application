import { useState, useEffect, createContext } from "react";
import { database } from "./firebase";
import { ref, onValue } from "firebase/database";

export let MovieContext = createContext("");

const MovieProvider = ({ children }) => {
  let [Movies, setMovies] = useState([]);
  useEffect(() => {
    let fetchMovies = () => {
      let movieList = ref(database, "movie-data/");
      onValue(movieList, data => {
        let movieDataList = [];
        data.forEach(value => {
          let movieKey = value.key;
          let movieVal = value.val();
          movieDataList.push({
            movieKey,
            movieVal,
          });
        });
        setMovies(movieDataList);
      });
    };
    fetchMovies();
  }, []);
  return (
    <MovieContext.Provider value={{Movies}}>{children}</MovieContext.Provider>
  );
};

export default MovieProvider;
