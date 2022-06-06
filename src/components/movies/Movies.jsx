import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import MovieSection from "./MovieSection";

const Movies = () => {
  let location = useLocation();
  return (
    <section>
      <article>
        {location.pathname === "/user/movie" ? <MovieSection /> : <Outlet />}
      </article>
    </section>
  );
};

export default Movies;
