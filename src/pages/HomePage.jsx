import axios from "axios";
import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/week",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTIyMGMyOWUyNTI1ZGQyOTkyNjZmOTI2NTFlZGQ5NSIsInN1YiI6IjY2MTkwYTkzZWE4NGM3MDE3ZDU2ZTY1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3okoPuK6bYT8Nbg1Ko3rb-FRfyEXI4Ajm4IsK3RZzow",
            },
          }
        );
        setPopularMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <MovieList movies={popularMovies} />
    </div>
  );
};

export default HomePage;
