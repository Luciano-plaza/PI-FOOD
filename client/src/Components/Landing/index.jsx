import React from "react";
import { Link } from "react-router-dom";
import {
  landing__container,
  landing__div,
  landing__btn,
} from "./Home.module.css";

export default function Home() {
  return (
    <div className={landing__container}>
      <div className={landing__div}>
        <Link to="/home">
          <div className={landing__btn}>Bon Appétit</div>
        </Link>
      </div>
    </div>
  );
}
