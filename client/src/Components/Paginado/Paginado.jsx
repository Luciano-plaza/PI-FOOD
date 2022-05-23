import React from 'react'

export const Paginado = ({recipes, pageLimit, paginado}) => {

    const arrPages = [];
    for (let i = 1; i <= Math.ceil(recipes/pageLimit); i++) {
        arrPages.push(i)    
    }

    return (
        <nav className='Paginado'>
            <ul>
                {arrPages && arrPages.map(index => (
                    <button className='button' key={index} onClick={() => paginado(index)} >{index}</button>
                ))}
            </ul>
        </nav>
    )
}