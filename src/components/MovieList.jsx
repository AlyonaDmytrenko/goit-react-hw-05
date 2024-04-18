import { NavLink } from "react-router-dom";

const MovieList = ({ movies }) => {
  return (
    <div>
      <h3>Search Results:</h3>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <NavLink to={`/movie/${movie.id}`}>{movie.title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
