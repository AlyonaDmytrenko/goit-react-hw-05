import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <ul>
        <li>
          <NavLink className={css.navLink} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={css.navLink} to="/movies">
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
