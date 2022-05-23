const {Recipe, Tipo} = require('../db.js');
const axios = require('axios');
// const {YOUR_API_KEY} = process.env;
const {YOUR_API_KEY2} = process.env
const respuesta = require('../../respuesta.json')

async function getAllData() {
    // const api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY2}&addRecipeInformation=true&number=100`)
    const api = respuesta
    // PONER EL .DATA Y EL AWAIT PARA PETICIONES NORMALES
    const receta = api.results.map(element => {
        
        return {
            id:element.id,
            title:element.title,
            dishTypes:element.dishTypes,
            image:element.image,
            diets:element.diets,
            CREATED:true,
            score:element.spoonacularScore,
            healthscore:element.healthScore,
            summary:element.summary,
            steps:element.analyzedInstructions[0]?.steps.map(e =>e.step)
        }
    })
    return receta
};

async function getAllDataDB() {
    const infoDB = await Recipe.findAll({
        include: {
            model:Tipo,
            attributes:['diets'],
            through: {
                attributes: []
            }
        }
    })
    return infoDB
};

async function getAll() {
    const API = await getAllData()
    const BASE = await getAllDataDB()
    const concatenado = API.concat(BASE)
    return concatenado
};

async function getDiets() {

    // const api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY2}&addRecipeInformation=true&number=100`)
        // PONER EL .DATA Y EL AWAIT PARA PETICIONES NORMALES
    const api = respuesta
    const PETICIONES = api.results.map(a => a.diets);
    const arrayDiets = [];
    PETICIONES.map(a => {
        for (var i = 0; i < a.length; i++) {
            arrayDiets.push(a[i])
        }
    });
    const dietList = [... new Set(arrayDiets)];
    for (let i = 0; i < dietList.length; i++) {
        await Tipo.findOrCreate({
            where: {diets: dietList[i]}
        })
    }
}

module.exports = {
    getAll,
    getDiets
}