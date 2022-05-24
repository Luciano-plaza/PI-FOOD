import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {getRecipes} from '../../Actions/index.js'
import s from './Search.module.css'

export default function Search() {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')

    function handleChange(e) {
        e.preventDefault()
        setValue(e.target.value)
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getRecipes(value))
        setValue('')
        if(getRecipes(value).length === 0) alert('No hay resultados para su búsqueda');

    }

    return (
        <div >

        <input className={s.Search} type='text'
        autoComplete="off"
        value={value}
        placeholder="Recipe..."
        onChange={e => handleChange(e) }
        />
        <input type='submit' onClick={e => handleSubmit(e)} className={s.Button_Search}/>

        </div>
    )
}
