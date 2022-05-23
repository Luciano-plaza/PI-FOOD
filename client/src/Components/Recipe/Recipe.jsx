import React from "react";
import './Recipe.css'

export default function Recipes({title, image, diets, score}) {

    return(
        <div className="card">

            <h3>{title}</h3>
            <img src={image} alt={title}/>
            <h4>{score}</h4>
            <div>{diets}</div>

        </div>
    )
    
}

