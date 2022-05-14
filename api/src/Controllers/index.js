const {Recipe, Tipo} = require('../db.js');
const axios = require('axios');
// const {YOUR_API_KEY} = process.env;
const {YOUR_API_KEY2} = process.env

async function getAllData() {
    const api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY2}&addRecipeInformation=true&number=100`)
    const receta = await api.data.results.map(element => {
        
        return {
            id:element.id,
            title:element.title,
            dishTypes:element.dishTypes,
            image:element.image,
            diets:element.diets,
            spoonacularScore:element.spoonacularScore,
            healthScore:element.healthScore,
            summary:element.summary,
            steps:element.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number:e.number,
                    step:e.step
                }
            })
        }
    })
    return receta
};

async function getAllDataDB() {
    const infoDB = await Recipe.findAll({
        include: {
            model:Tipo,
            attributes:['diets']
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

    const api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY2}&addRecipeInformation=true&number=100`)
    await api.data.results.map(element => {
        element.diets?.forEach(async dieta => {
            const dietas = await Tipo.findOrCreate({
                where: {diets: dieta}
            })
            return dietas
        })
    })

}

module.exports = {
    getAll,
    getDiets
}