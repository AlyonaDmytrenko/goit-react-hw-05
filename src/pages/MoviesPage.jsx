import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../components/MovieList";

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("query");
    setSearchQuery(query || "");
  }, [searchParams]);

  useEffect(() => {
    const searchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        if (searchQuery.trim() !== "") {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=0e220c29e2525dd299266f92651edd95&query=${searchQuery}`,
            {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTIyMGMyOWUyNTI1ZGQyOTkyNjZmOTI2NTFlZGQ5NSIsInN1YiI6IjY2MTkwYTkzZWE4NGM3MDE3ZDU2ZTY1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3okoPuK6bYT8Nbg1Ko3rb-FRfyEXI4Ajm4IsK3RZzow",
            }
          );
          setSearchResults(response.data.results);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchParams({ query: searchQuery });
  };

  return (
    <div>
      <h2>Search Movies</h2>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
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
