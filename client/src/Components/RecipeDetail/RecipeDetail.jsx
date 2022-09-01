import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipesById } from "../../Redux/Actions.js";
import NavBar from "../Nav";
import {
  details__container,
  details__title,
  details__photo,
  details__description,
  details__healthscore,
  details__score,
  details__list_diets,
  details__steps,
  details__default__steps,
} from "./Recipe.module.css";
import Loading from "../Loading/Loading.jsx";

export default function RecipeDetail() {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.recipesDetail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipesById(id));
  }, [dispatch, id]);
  console.log(details[0]);
  return (
    <div>
      <NavBar />

      {details.length > 0 ? (
        <div className={details__container}>
          <h2 className={details__title}>{details[0].title}</h2>

          <img
            src={details[0].image}
            alt={details[0].title}
            className={details__photo}
          />

          <h3 className={details__list_diets}>
            Diets:
            <span>{" "}
              {details[0].CREATED
                ? details[0].diets.map((diet) => {
                    if (diet !== details[0].diets[details[0].diets.length - 1])
                      return `${diet}, `;
                    return `${diet}.`;
                  })
                : details[0].Tipos[0].diets}
            </span>
          </h3>

          <h3 className={details__score}>
            Score: <p>{details[0].score}</p>
          </h3>

          <h3 className={details__healthscore}>
            Healthscore: <p>{details[0].healthscore}</p>
          </h3>

          <p className={details__description}>
            Summary: <span> {details[0].summary.replace(/<[^>]+>/g, "")}</span>
          </p>

          <div className={details__steps}>
            <h3>Steps: </h3>

            <ul>
              {details[0].steps ? (
                Array.isArray(details[0].steps) ? (
                  details[0].steps.map((p) => {
                    return <li key={p}>{p}</li>;
                  })
                ) : (
                  <li>{details[0].steps}</li>
                )
              ) : (
                <p className={details__default__steps}>{" "}
                  Esta receta no contiene pasos o están explicadas en su
                  descripción
                </p>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
