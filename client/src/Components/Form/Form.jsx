import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../Nav";
import { CreateRecipe, getDiets } from "../../Redux/Actions.js";
import {
  form__div,
  form__leyend,
  form__input,
  form__input__description,
  form__input__URL,
  form__select,
  form__diets__selected,
  form__danger,
  ul__delete,
  ul__diet,
  form__btn,
} from "./Form.module.css";

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
        <p className={form__leyend}>Name of Recipe: </p>
        <div className={form__div}>
          <input
            className={`${form__input} ${error.title ? form__danger : null}`}
            type="text"
            autoComplete="off"
            placeholder="Recipe..."
            value={state.title}
            onChange={(e) => handleChange(e)}
            name="title"
          />
        </div>

        <p className={form__leyend}>Score: </p>
        <div className={form__div}>
          <input
            className={`${form__input} ${error.score ? form__danger : null}`}
            type="number"
            autoComplete="off"
            placeholder="Score..."
            value={state.score}
            onChange={(e) => handleChange(e)}
            name="score"
          />
        </div>

        <p className={form__leyend}>Summary: </p>
        <div className={form__div}>
          <textarea
            className={`${form__input__description} ${
              error.summary ? form__danger : null
            }`}
            type="text"
            autoComplete="off"
            placeholder="Summary..."
            value={state.summary}
            onChange={(e) => handleChange(e)}
            name="summary"
          />
        </div>

        <p className={form__leyend}>Image: </p>
        <div className={form__div}>
          <input
            className={`${form__input__URL} ${
              error.image ? form__danger : null
            }`}
            type="url"
            autoComplete="off"
            placeholder="URL..."
            value={state.image}
            onChange={(e) => handleChange(e)}
            name="image"
          />
        </div>

        <p className={form__leyend}>Steps: </p>
        <div className={form__div}>
          <textarea
            className={`${form__input__description} ${
              error.steps ? form__danger : null
            }`}
            type="text"
            autoComplete="off"
            placeholder="Steps..."
            value={state.steps}
            onChange={(e) => handleChange(e)}
            name="steps"
          />
        </div>

        <p className={form__leyend}>Healthscore: </p>
        <div className={form__div}>
          <input
            className={`${form__input} ${
              error.healthscore ? form__danger : null
            }`}
            type="number"
            autoComplete="off"
            placeholder="Healthscore..."
            value={state.healthscore}
            onChange={(e) => handleChange(e)}
            name="healthscore"
          />
        </div>

        <select
          onClick={(e) => handleDiets(e)}
          className={`${form__select} ${error.diets ? form__danger : null}`}
        >
          <option value="AllDiets">Diets</option>
          {dietas.map((diet) => (
            <option value={diet.diets} key={diet.diets}>
              {diet.diets}
            </option>
          ))}
        </select>

        <input type="submit" className={form__btn} value="Send"/>

        <ul className={form__diets__selected}>
          {state.diets.map((e) => (
            <div key={e} className={ul__diet}>
              <button
                onClick={(e) => handleDelete1(e)}
                value={e}
                className={ul__delete}
              >
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
