import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from '../Nav/index.jsx';
import {getAllRecipes, orderAZ, orderScore, filterDiet} from '../../Actions/index.js'
import Recipes from "../Recipe/Recipe.jsx";
import { Paginado } from "../Paginado/Paginado.jsx";
import Search from '../Search/index.jsx';
import { Link } from "react-router-dom";

export default function HomePage() {
    
    const dispatch = useDispatch();
    const recipes = useSelector (state => state.recipes);
    // const [loading, setLoading]= useState(false)
    const [page, setPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(9);
    const LastIndex = page*pageLimit;
    const FirstIndex = LastIndex - pageLimit;
    const cards = recipes.slice(FirstIndex, LastIndex)
    const [order, setOrder] = useState('')
    
    const paginado = pageNumber => {
        setPage(pageNumber)
    }
    
    useEffect(() => {
        dispatch(getAllRecipes());
        
    }, [dispatch])
    
    function handleReset(e) {
        e.preventDefault()
        dispatch(getAllRecipes())
    }
    
    function handleDiet(e) {
        e.preventDefault()
        setPage(1)
        dispatch(filterDiet(e.target.value))
        setOrder(`Ordenado por ${e.target.value}`)
    }

    function handleSort(e) {
        e.preventDefault()
        dispatch(orderAZ(e.target.value))
        setPage(1)
        setOrder(`Ordenado pr ${e.target.value}`)
    }
    
    function handleScore(e) {
        e.preventDefault()
        dispatch(orderScore(e.target.value))
        setPage(1)
        setOrder(`Ordenado por ${e.target.value}`)
    }

    return (
        <div>
            <div>
                <NavBar/>
                <Search/>

                <button onClick={e => handleReset(e)}>Reset</button>
                <select  onChange={e => handleSort(e)}>
                    <option value="asc"> A-Z </option>
                    <option value="desc"> Z-A </option>
                </select>

                <select onChange={e => handleScore(e)}>
                    <option value="max">Max Score</option>
                    <option value="min">Min Score</option>
                </select>

                <select onChange={e => handleDiet(e)}>
                    <option value='AllDiets'>Todas las dietas</option>
                    <option value='gluten free'>gluten free</option>
                    <option value='dairy free'>dairy free</option>
                    <option value='lacto ovo vegetarian'>lacto ovo vegetarian</option>
                    <option value='vegan'>vegan</option>
                    <option value='paleolithic'>paleolithic</option>
                    <option value='primal'>primal</option>
                    <option value='pescatarian'>pescatarian</option>
                    <option value='fodmap friendly'>fodmap friendly</option>
                    <option value='whole 30'>whole 30</option>
                </select>
            </div>

            <Paginado pageLimit={pageLimit} recipes={recipes.length} paginado={paginado}/>

            {cards?.map(receta => {
                return (
                    <div key={receta.id}>
                        <Link to={`recipeDetail/${receta.id}`}>
                            <Recipes
                                id={receta.id}
                                title={receta.title}
                                image={receta.image}
                                diets={receta.CREATED? receta.diets.map(p => p+' ') : receta.Tipos[0].diets}
                                score={receta.score}
                            />
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}
