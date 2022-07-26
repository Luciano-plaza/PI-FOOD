import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Landing";
import HomePage from "./Components/HomePage";
import RecipeDetail from "./Components/RecipeDetail/RecipeDetail.jsx";
import Form from "./Components/Form/Form";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />

      <Route path="/home" element={<HomePage />} />

      <Route path="/home/recipeDetail/:id" element={<RecipeDetail />} />

      <Route path="/createRecipe" element={<Form />} />
    </Routes>
  );
}

export default App;
