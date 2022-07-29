import React from "react";
import { Link } from "react-router-dom";
import style from "./Home.module.css";

export default function Home() {
  return (
    <div className={style.background}>
      <div className={style.container}>
        <Link to="/home">
          <h2 className={style.landing}>Bon Appétit</h2>
        </Link>
      </div>
    </div>
  );
}
