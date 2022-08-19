import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../Nav/index.jsx";
import {
  getAllRecipes,
  orderAZ,
  orderScore,
  filterDiet,
} from "../../Redux/Actions.js";
import Recipes from "../Recipe/Recipe.jsx";
import { Paginated } from "../Paginated/Paginated.jsx";
import { Link } from "react-router-dom";
import style from "./HomePage.module.css";

export default function HomePage() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);

  const [page, setPage] = useState(1);
  const [pageLimit] = useState(9);
  const LastIndex = page * pageLimit;
  const FirstIndex = LastIndex - pageLimit;
  const cards = recipes.slice(FirstIndex, LastIndex);

  const paginated = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  function handleReset(e) {
    e.preventDefault();
    dispatch(getAllRecipes());
  }

  function handleDiet(e) {
    e.preventDefault();
    setPage(1);
    dispatch(filterDiet(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    setPage(1);
    dispatch(orderAZ(e.target.value));
  }

  function handleScore(e) {
    e.preventDefault();
    setPage(1);
    dispatch(orderScore(e.target.value));
  }
  console.log(recipes);
  return (
    <div className="Fondo">
      <div>
        <NavBar />

        <select onChange={(e) => handleSort(e)}>
          <option value="asc"> A-Z </option>
          <option value="desc"> Z-A </option>
        </select>

        <select onChange={(e) => handleScore(e)}>
          <option value="max">Max Score</option>
          <option value="min">Min Score</option>
        </select>

        <select onChange={(e) => handleDiet(e)}>
          <option value="AllDiets">Todas las dietas</option>
          <option value="gluten free" name="">
            gluten free
          </option>
          <option value="dairy free">dairy free</option>
          <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
          <option value="vegan">vegan</option>
          <option value="paleolithic">paleolithic</option>
          <option value="primal">primal</option>
          <option value="pescatarian">pescatarian</option>
          <option value="fodmap friendly">fodmap friendly</option>
          <option value="whole 30">whole 30</option>
        </select>
      </div>
      <button onClick={(e) => handleReset(e)} className={style.Reset}>
        Reset
      </button>

      <Paginated
        pageLimit={pageLimit}
        recipes={recipes.length}
        paginated={paginated}
      />
      <div className={style.PatherCards}>
        {cards?.map((receta) => {
          return (
            <div key={receta.id} className={style.Card}>
              <Link to={`recipeDetail/${receta.id}`}>
                <Recipes
                  id={receta.id}
                  title={receta.title}
                  image={receta.image}
                  diets={
                    receta.CREATED
                      ? receta.diets.map((p) => p + " ")
                      : receta.Tipos[0].diets
                  }
                  score={receta.healthscore}
                  minutes={receta.weightWatcherSmartPoints}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
