import React from "react";
import { NavLink } from "react-router-dom";
import { links, nav__without__search } from "./Nav.module.css";
import Search from "../Search/Search.jsx";

export default function NavBar() {
  return (
    <nav
      className={`${
        window.location.pathname === "/createRecipe"
          ? nav__without__search
          : null
      }`}
    >
      <NavLink to="/home" className={`${links}`}>
        Home
      </NavLink>
      {window.location.pathname === "/home" ? <Search /> : null}
      <NavLink to="/createRecipe" className={`${links}`}>
        Create recipe
      </NavLink>
    </nav>
  );
}
