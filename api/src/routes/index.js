const axios = require('axios');
const { Router} = require('express');
const {getAll, getDiets} = require('../Controllers/index')
const {Recipe, Tipo} = require('../db.js');
const {YOUR_API_KEY2} = process.env

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes', async (req, res) => {
    const {name} = req.query;
    const receta = await getAll()
    if(name) {
        const filtrado = await receta.filter(p => p.title.toLowerCase().includes(`${name.toLowerCase()}`))
        if(filtrado.length > 0) {
            res.json(filtrado)
        } else res.send('No hay resultados para la búsqueda')
    } else res.json(receta);
        
});

router.get('/recipes/:id', async (req, res) => {
    const {id} = req.params;

        if(id) {
            const aux = await getAll();
            const receta = await aux.filter(p => p.id.toString() === id.toString());
            if(receta.length !== 0) {
                res.json(receta)
            } else res.send('No se encontraron resultados para la búsqueda')

        } else res.status(404).send('Esta receta no existe')

        
});

router.get('/types', async (req, res) => {
    try {
        await getDiets()
        const dietas = await Tipo.findAll();
        
        res.json(dietas)

    } catch (error) {
        res.send(error)
    }
});

router.post('/recipes', async (req, res) => {
    const {title, summary, spoonacularScore, healthScore, dishTypes, steps, diets} = req.body
    await getDiets();
    
    try {
        const dieta = await Tipo.findAll({
            where:{diets:diets}
        })

        const receta = await Recipe.create({
            title,
            spoonacularScore,
            healthScore,
            summary,
            dishTypes,
            steps
        })

        await receta.addTipos(dieta)

        await Recipe.findAll({
            include: [{
              model: Tipo,
              attributes: ['diets'],
              through: {
                attributes: []
              }
            }]
          });
        
        res.send('Su receta fue creada con éxito, Bon appétit!!')

    } catch (error) {

        res.status(404).send('No fue posible crear la receta')
    }
})

module.exports = router;
