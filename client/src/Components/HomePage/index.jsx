import { useEffect, useState } from "react";
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
import Loading from "../Loading/Loading.jsx";
import { Link } from "react-router-dom";
import {
  home__header__container,
  home__reset,
  home__cards__container,
  home__card,
  home__select,
} from "./HomePage.module.css";

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
    <div>
      <div>
        <NavBar />
        <div className={home__header__container}>
          <select onChange={(e) => handleSort(e)} className={home__select}>
            <option value="asc"> A-Z </option>
            <option value="desc"> Z-A </option>
          </select>

          <select onChange={(e) => handleScore(e)} className={home__select}>
            <option value="max">Max Score</option>
            <option value="min">Min Score</option>
          </select>

          <select onChange={(e) => handleDiet(e)} className={home__select}>
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
      </div>
      <button onClick={(e) => handleReset(e)} className={home__reset}>
        Reset
      </button>

      {recipes ? (
        <div>
          <Paginated
            pageLimit={pageLimit}
            recipes={recipes.length}
            paginated={paginated}
          />
          <div className={home__cards__container}>
            {cards?.map((receta) => {
              return (
                <div key={receta.id} className={home__card}>
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
      ) : (
        <Loading />
      )}
    </div>
  );
}
