import axios from 'axios'

export const getAllRecipes = () => {
    return async function (dispatch) {
        try {
            const call = await axios.get(`/recipes`)
            dispatch({ type: 'GET_ALL_RECIPES', payload: call.data })

        } catch (error) {
            return error
        }
    }
}

export const getRecipes = (name) => {
    return async function (dispatch) {
        try {
            const call = await axios.get(`/recipes?name=${name}`)
            dispatch({ type: 'GET_RECIPES', payload: call.data })

        } catch (error) {
            return error
        }
    }
}

export const getRecipesById = (id) => {
    return async function (dispatch) {
        try {
            const call = await axios.get(`/recipes/${id}`)

            dispatch({ type: 'GET_RECIPE_DETAIL', payload: call.data })
        } catch (error) {
            return error
        }
    }
}
export const getDiets = () => {
    return async function (dispatch) {
        try {
            const call = await axios.get(`/types`)
            dispatch({ type: 'GET_DIETS', payload: call.data })
            return call
        } catch (error) {
            return error

        }
    }
}

export function CreateRecipe(payload) {
    return async function () {
        try {
            const res = await axios.post(`/recipe`, payload);

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