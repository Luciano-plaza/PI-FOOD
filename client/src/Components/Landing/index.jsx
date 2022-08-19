import React from "react";
import { Link } from "react-router-dom";
import style from "./Home.module.css";

export default function Home() {
  return (
    <div className={style.background}>
      <div className={style.div__landing__container}>
        <Link to="/home">
          <div className={style.landing}>Bon Appétit</div>
        </Link>
      </div>
    </div>
  );
}
