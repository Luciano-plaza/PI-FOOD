import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {getRecipesById} from '../../Actions/index.js'
import NavBar from '../Nav'
import s from './Recipe.module.css'

export default function RecipeDetail() {
  
  const dispatch = useDispatch()
  const details = useSelector(state => state.recipesDetail)
  const {id} = useParams()
  
  useEffect(() => {
    dispatch(getRecipesById(id))
  }, [dispatch, id])
  
  return (
    <div>
      <NavBar/>
      {details.length > 0?
        <div className={s.Details}>
          <h2>{details[0].title}</h2>
          
          <h4>Diets: {details[0].CREATED? details[0].diets.map(p => p+' '): details[0].Tipos[0].diets}</h4>

          <h4>Score: {details[0].score}</h4>

          <img src={details[0].image} alt={details[0].title}/>

          <h4>Healthscore: {details[0].healthscore}</h4>

          <p>Summary: {details[0].summary.replace(/<[^>]+>/g, '')}</p>

            <h3>Steps:</h3>
          <ul>
            {details[0].steps?Array.isArray(details[0].steps)?details[0].steps.map(p => {
              return (
                <li key={p}>{p}</li>
              )
            })  :  <li>{details[0].steps}</li>
            :  'Esta receta no contiene pasos o están explicadas en su descripción'
            }
          </ul>
        </div>
      : <p>Hubo un error</p>}
    </div>
  )
}
