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
    }

    return (
        <div>

        <input type='text'
        autoComplete="off"
        placeholder="Recipe..."
        onChange={e => handleChange(e)}
        />
        <input type='submit' onClick={e => handleSubmit(e)}/>

        </div>
    )
}

// export default connect()(Search)