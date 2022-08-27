import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipes } from "../../Redux/Actions";
import style from "./Search.module.css";
import magnifying_glass from "./Search.svg"

export default function Search() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getRecipes(value));
    setValue("");
    if (getRecipes(value).length === 0)
      alert("No hay resultados para su búsqueda");
  }
  
  return (
    <div className={style.SearchContainer}>
      <input
        type="text"
        autoComplete="off"
        value={value}
        placeholder="Recipe..."
        onChange={(e) => handleChange(e)}
      />
      <div onClick={(e) => handleSubmit(e)} className={style.btn}>
        <img src={magnifying_glass} alt="Search" />
      </div>
    </div>
  );
}
