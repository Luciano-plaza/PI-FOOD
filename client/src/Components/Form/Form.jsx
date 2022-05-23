import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../Nav";
import {CreateRecipe, getDiets} from '../../Actions/index.js'
import './Form.css'

export default function Form() {
    
    const dispatch = useDispatch();
    const dietas = useSelector(state => state.diets);
    const [error, setError] = useState({});
    const [state, setState] = useState({
        title:'',
        summary:'',
        image:'',
        steps:'',
        score: 0,
        healthscore: 0,
        diets:[]
    });
    
    useEffect(() => {
        dispatch(getDiets());
        
    }, [dispatch])
    
    function validate(state) {
        let errors = {}
        if(!state.title) {
            errors.title = 'El nombre de la receta ingresada no es válido'
        } else if(!state.summary || state.summary.length < 20) {
            errors.summary = 'No cumple con los requisitos mínimos de un resumen de su receta'
        }
        return errors
    }
    
    function handleChange(e) {
        e.preventDefault();
        setState({...state,
            [e.target.name]:e.target.value
        });
        
        setError(validate({
            ...state,
            [e.target.name]:e.target.value
        }))
        console.log(state)
    };
    
    function handleDiets(e) {
        e.preventDefault();
        if(e.target.value !== 'AllDiets' && !state.diets.includes(e.target.value)) {
            setState({...state, diets: [...state.diets, e.target.value]})
        };
        // if(state.diets.length === 0) setError('Debe elegir por lo menos una dieta');
        
    };

    function handleDelete1(e) {
        e.preventDefault()
        setState({...state, diets: state.diets.filter(p => p !== e.target.value)})

    };

    function handleSubmit(e) {
        e.preventDefault()

        console.log(state)
        dispatch(CreateRecipe(state))
        setState({
            title:'',
            summary:'',
            image:'',
            steps:'',
            score: 0,
            healthscore: 0,
            diets:[],
            
        })
        alert('Se creó tu receta!!')
    }

    return (
        <div>
            <NavBar/>

            <form onSubmit={e => handleSubmit(e)}>

                <div>
                    <label>Name of Recipe: </label>
                    <input type='text' autoComplete="off" placeholder="Recipe..."  value={state.title}
                        onChange={e => handleChange(e)} name='title' className={error && 'danger'}/>
                </div>

                <div>
                    <label>Score: </label>
                    <input type='number' autoComplete="off" placeholder="Score..." value={state.score}
                        onChange={e => handleChange(e)} name='score' className={error && 'danger'}/>
                </div>

                <div>
                    <label>Summary: </label>
                    <input type='text' autoComplete="off" placeholder="Summary..."  value={state.summary}
                        onChange={e => handleChange(e)} name='summary' className={error && 'danger'}/>
                </div>

                <div>
                    <label>Image: </label>
                    <input type='url' autoComplete="off" placeholder="URL..."  value={state.image}
                        onChange={e => handleChange(e)} name='image' className={error && 'danger'}/>
                </div>

                <div>
                    <label>Steps: </label>
                    <input type='text' autoComplete="off" placeholder="Steps..."  value={state.steps}
                        onChange={e => handleChange(e)} name='steps' className={error && 'danger'}/>
                </div>

                <div>
                    <label>Healthscore: </label>
                    <input type='number' autoComplete="off" placeholder="Healthscore..."  value={state.healthscore}
                        onChange={e => handleChange(e)} name='healthscore' className={error && 'danger'}/>
                </div>

                <select onClick={e => handleDiets(e)} className={error && 'danger'}>
                    <option value='AllDiets'>Diets</option>
                    {dietas.map(diet => (
                        <option value={diet.diets} key={diet.diets}>{diet.diets}</option>
                    ))}
                </select>

                <input type='submit'/>
            </form>

            <ul>
                {state.diets.map(e =>
                    <div key={e}>
                        <button onClick={e => handleDelete1(e) } value={e}>X</button>
                        <p>{e}</p>
                    </div>
                )}
            </ul>

        </div>
    )
}