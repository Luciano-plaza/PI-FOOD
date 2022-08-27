const { Recipe, Tipo } = require("../db.js");
const axios = require("axios");
// const {YOUR_API_KEY} = process.env;
const respuesta = require("../../respuesta.json");

// Traigo la información que necesito de la API
async function getAllData() {
  // const api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY2}&addRecipeInformation=true&number=100`)
  // PONER EL .DATA Y EL AWAIT PARA PETICIONES NORMALES

  // Trabajo con datos locales por mal funcionamiento de la API y la poca cantidad de peticiones
  const api = respuesta;
  return api.results.map((element) => {
    return {
      id: element.id,
      title: element.title,
      dishTypes: element.dishTypes,
      image: element.image,
      diets: element.diets,
      CREATED: true,
      weightWatcherSmartPoints: element.weightWatcherSmartPoints,
      score: element.spoonacularScore,
      healthscore: element.healthScore,
      summary: element.summary,
      steps: element.analyzedInstructions[0]?.steps.map((e) => e.step),
    };
  });
}
// Traigo toda la información que es creada por usuarios
async function getAllDataDB() {
  return await Recipe.findAll({
    include: {
      model: Tipo,
      attributes: ["diets"],
      through: {
        attributes: [],
      },
    },
  });
}

// Concateno los datos para que no haya distinciones a primera vista y se puedan aplicar bien los filtrados
async function getAll() {
  const API = await getAllData();
  const BASE = await getAllDataDB();
  return API.concat(BASE);
}

// Solicito y filtro las dietas disponibles de las recetas para
async function getDiets() {
  // const api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY2}&addRecipeInformation=true&number=100`)
  // PONER EL .DATA Y EL AWAIT PARA PETICIONES NORMALES
  const api = respuesta;
  const PETICIONES = api.results.map((a) => a.diets);
  const arrayDiets = [];
  PETICIONES.map((a) => {
    for (var i = 0; i < a.length; i++) {
      arrayDiets.push(a[i]);
    }
  });
  const dietList = [...new Set(arrayDiets)];
  for (let i = 0; i < dietList.length; i++) {
    await Tipo.findOrCreate({
      where: { diets: dietList[i] },
    });
  }
  return dietList;
}

module.exports = {
  getAll,
  getDiets,
};
