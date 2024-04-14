import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MovieCast from "./pages/components/MovieCas";
import MovieReviews from "./pages/components/MovieReviews";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/movies">Movies</NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/movies" element={<MoviesPage />}></Route>
          <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
          <Route path="/movies/:movieId/cast" element={<MovieCast />}></Route>
          <Route
            path="/movies/:movieId/reviews"
            element={<MovieReviews />}
          ></Route>
          <Route path="/movies/:movieId/cast" element={<MovieCast />}></Route>
          <Route path="*" element={<NotFoundPage />} />{" "}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
