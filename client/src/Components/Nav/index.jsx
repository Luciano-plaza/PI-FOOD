import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Nav.module.css";
import Search from "../Search/Search.jsx";

export default function NavBar() {
  return (
    <nav>
      <NavLink to="/home" className={s.links}>
        Home
      </NavLink>
      {window.location.pathname === '/home'? <Search/> : null}
      <NavLink to="/createRecipe" className={s.links}>
        Crea tu receta
      </NavLink>
    </nav>
  );
}
