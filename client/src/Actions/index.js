import axios from 'axios'

export const getAllRecipes = () => {
    return async function (dispatch) {
        return await fetch(`http://localhost:3001/recipes`)
        .then(r => r.json())
        .then(res => {
            dispatch({type:'GET_ALL_RECIPES', payload: res})
        })
        .catch(error => {return error})
    }
}

export const getRecipes = (name) => {
    return async function (dispatch) {
        return await fetch(`http://localhost:3001/recipes?name=${name}`)
        .then(r => r.json())
        .then(res => {
            dispatch({type:'GET_RECIPES', payload: res})
        })
        .catch(error => {return error})
    }
}

export const getRecipesById = (id) => {
    return async function (dispatch) {
        return await fetch(`http://localhost:3001/recipes/${id}`)
        .then(r => r.json())
        .then(res => {
            dispatch({type:'GET_RECIPE_DETAIL', payload: res})
        })
        .catch(error => {return error})
    }
}

export const getDiets = () => {
    return async function (dispatch) {
        return await fetch(`http://localhost:3001/types`)
        .then(r => r.json())
        .then(res => {
            dispatch({type:'GET_DIETS', payload: res})
        })
        .catch(error => {return error})
    }
}

export function CreateRecipe(payload) {
    return async function () {
        try {
            const res = await axios.post(`http://localhost:3001/recipe`, payload);
            
            return res;
        } catch (error) {
            return error
        }

    }
}

export function orderAZ(payload) {
    return {
        type: 'ORDER_A_Z',
        payload
    }
}

export function orderScore(payload) {
    return {
        type: 'ORDER_SCORE',
        payload
    }
}

export function filterDiet(payload) {
    return {
        type: 'FILTER_DIET',
        payload
    }
}