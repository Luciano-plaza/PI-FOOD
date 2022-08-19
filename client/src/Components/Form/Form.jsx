import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../Nav";
import { CreateRecipe, getDiets } from "../../Redux/Actions.js";
import s from "./Form.module.css";

function validate(state) {
  let errors = {};

  if (!state.title) {
    errors.title = "No es válido";
  } else if (state.score < 1 || state.score > 100 || !state.score) {
    errors.score = "Ingrese un número válido";
  } else if (!state.summary || state.summary.length < 20) {
    errors.summary = "20 caracteres mínimos";
  } else if (!state.steps || state.steps.length < 50) {
    errors.steps = "50 caracteres mínimos";
  } else if (
    state.healthscore < 1 ||
    state.healthscore > 100 ||
    !state.healthscore
  ) {
    errors.healthscore = "Ingrese un número válido";
  } else if (state.diets.length === 0) {
    errors.diets = "ingrese una dieta";
  }
  return errors;
}

export default function Form() {
  const dispatch = useDispatch();
  const dietas = useSelector((state) => state.diets);
  const [error, setError] = useState({});
  const [state, setState] = useState({
    title: "",
    summary: "",
    image: "",
    steps: "",
    score: 0,
    healthscore: 0,
    diets: [],
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });

    setError(
      validate({
        ...state,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleDiets(e) {
    e.preventDefault();
    if (
      e.target.value !== "AllDiets" &&
      !state.diets.includes(e.target.value)
    ) {
      setState({ ...state, diets: [...state.diets, e.target.value] });
    }

    setError(
      validate({
        ...state,
        [e.target.value]: e.target.value,
      })
    );
  }

  function handleDelete1(e) {
    e.preventDefault();
    setState({
      ...state,
      diets: state.diets.filter((p) => p !== e.target.value),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(
      validate({
        ...state,
        [e.target.name]: e.target.value,
      })
    );
    if (Object.values(error).length) {
      alert("No se pudo crear la receta");
    } else {
      dispatch(CreateRecipe(state));
      alert("Se creó tu receta!!");
      setState({
        title: "",
        summary: "",
        image: "",
        steps: "",
        score: 0,
        healthscore: 0,
        diets: [],
      });
    }
  }

  return (
    <div>
      <NavBar />

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={s.divs}>
          <p>Name of Recipe: </p>
          <input
            type="text"
            autoComplete="off"
            placeholder="Recipe..."
            value={state.title}
            onChange={(e) => handleChange(e)}
            name="title"
          />
        </div>
        {error.title && <span className={s.danger}>{error.title}</span>}

        <div className={s.divs}>
          <p>Score: </p>
          <input
            type="number"
            autoComplete="off"
            placeholder="Score..."
            value={state.score}
            onChange={(e) => handleChange(e)}
            name="score"
          />
        </div>
        {error.score && <span className={s.danger}>{error.score}</span>}

        <div className={s.divs}>
          <p>Summary: </p>
          <input
            type="text"
            autoComplete="off"
            placeholder="Summary..."
            value={state.summary}
            onChange={(e) => handleChange(e)}
            name="summary"
          />
          {error.summary && <span className={s.danger}>{error.summary}</span>}
        </div>

        <div className={s.divs}>
          <p>Image: </p>
          <input
            type="url"
            autoComplete="off"
            placeholder="URL..."
            value={state.image}
            onChange={(e) => handleChange(e)}
            name="image"
          />
          {error.image && <span className={s.danger}>{error.image}</span>}
        </div>

        <div className={s.divs}>
          <p>Steps: </p>
          <textarea
            type="text"
            autoComplete="off"
            placeholder="Steps..."
            value={state.steps}
            onChange={(e) => handleChange(e)}
            name="steps"
          />
          {error.steps && <span className={s.danger}>{error.steps}</span>}
        </div>

        <div className={s.divs}>
          <p>Healthscore: </p>
          <input
            type="number"
            autoComplete="off"
            placeholder="Healthscore..."
            value={state.healthscore}
            onChange={(e) => handleChange(e)}
            name="healthscore"
          />
          {error.healthscore && (
            <span className={s.danger}>{error.healthscore}</span>
          )}
        </div>

        <select onClick={(e) => handleDiets(e)}>
          <option value="AllDiets">Diets</option>
          {dietas.map((diet) => (
            <option value={diet.diets} key={diet.diets}>
              {diet.diets}
            </option>
          ))}
        </select>
        {error.diets && <span className={s.danger}>{error.diets}</span>}

        <input type="submit" />

        <ul>
          {state.diets.map((e) => (
            <div key={e}>
              <button onClick={(e) => handleDelete1(e)} value={e}>
                X
              </button>
              <p>{e}</p>
            </div>
          ))}
        </ul>
      </form>
    </div>
  );
}
