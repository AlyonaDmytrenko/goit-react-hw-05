import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const getNavLinkClassName = ({ isActive }) =>
  clsx(css.navLink, { [css.active]: isActive });

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <ul>
        <li>
          <NavLink className={getNavLinkClassName} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={getNavLinkClassName} to="/movies">
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
