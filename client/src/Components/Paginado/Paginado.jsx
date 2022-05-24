import React from 'react'
import s from './Paginado.module.css';
export const Paginado = ({recipes, pageLimit, paginado}) => {

    const arrPages = [];
    for (let i = 1; i <= Math.ceil(recipes/pageLimit); i++) {
        arrPages.push(i)    
    }

    return (
        <nav>
            <ul>
                {arrPages && arrPages.map(index => (
                    <button key={index} onClick={() => paginado(index)} >{index}</button>
                ))}
            </ul>
        </nav>
    )
}