import React from "react";
import s from './Recipe.module.css'

export default function Recipes({title, image, diets, score}) {

    return(
        <div className={s.card}>

            <h3 className={s.title}>{title}</h3>
            <img className={s.image} src={image} alt={title}/>
            <p className={s.score}>Score: {score}</p>
            <p className={s.dietas}>{diets}</p>

        </div>
    )
    
}

