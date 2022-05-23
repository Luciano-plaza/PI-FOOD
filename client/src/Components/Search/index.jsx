import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {getRecipes} from '../../Actions/index.js'
import './Search.css'

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

    }

    return (
        <div className="Search">

        <input type='text'
        autoComplete="off"
        value={value}
        placeholder="Recipe..."
        onChange={e => handleChange(e)}
        />
        <input type='submit' onClick={e => handleSubmit(e)} className='Button-Search'/>

        </div>
    )
}
