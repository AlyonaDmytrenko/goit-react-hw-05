import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../components/MovieList";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = searchParams.get("query") || "";
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    const searchMovies = async () => {
      if (!query.trim()) return;

      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=0e220c29e2525dd299266f92651edd95&query=${query}`
        );

        setSearchResults(response.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [query]);

  const handleSearchChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchParams({ query: inputValue });
  };

  return (
    <div>
      <h2>Search Movies</h2>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={inputValue}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {!loading && !error && <MovieList movies={searchResults} />}
    </div>
  );
};

export default MoviesPage;
