import React from "react";
import { Link } from "react-router-dom";
import style from "./Home.module.css";

export default function Home() {
  return (
    <div className={style}>
      <Link to="/home">
        <h2>Bon Appétit</h2>
      </Link>
    </div>
  );
}
