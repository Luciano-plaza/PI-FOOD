import React from "react";
import s from "./Recipe.module.css";

export default function Recipes({ title, image, diets, score }) {
  return (
    <div className={s.modelCard}>
      <img className={s.image} src={image} alt={title} />
      <h3 className={s.title}>{title}</h3>
      <div className={s.score}>Score: {score}</div>
      {diets.length ? (
        <p className={s.diets}>Diets: {diets}</p>
      ) : (
        "No se asignaron tipos de dietas"
      )}
    </div>
  );
}
