import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import MovieCast from "./components/MovieCast";
import MovieReviews from "./components/MovieReviews";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTIyMGMyOWUyNTI1ZGQyOTkyNjZmOTI2NTFlZGQ5NSIsInN1YiI6IjY2MTkwYTkzZWE4NGM3MDE3ZDU2ZTY1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3okoPuK6bYT8Nbg1Ko3rb-FRfyEXI4Ajm4IsK3RZzow",
            },
          }
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) return <div>Loading...</div>;

  return (
    <div>
      <h2>{movieDetails.title}</h2>
      <p>{movieDetails.overview}</p>
      {movieDetails.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
        />
      )}
      <p>Release Date: {movieDetails.release_date}</p>
      <p>Rating: {movieDetails.vote_average}</p>

      <div>
        <ul>
          <li>
            <Link to="cast" onClick={() => setShowCast(!showCast)}>
              Movie Cast
            </Link>
            {showCast && <MovieCast movieId={movieId} />}
            <Routes>
              <Route path="cast" element={MovieCast} />
            </Routes>
          </li>
          <li>
            <Link to="reviews" onClick={() => setShowReviews(!showReviews)}>
              Movie Reviews
            </Link>
            {showReviews && <MovieReviews movieId={movieId} />}
            <Routes>
              <Route path="reviews" element={MovieReviews} />
            </Routes>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
