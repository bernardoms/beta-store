import {createAction, createReducer} from '@reduxjs/toolkit'
const INITIAL_STATE = []

export const addProduct = createAction('ADD_PRODUCT')
export const getProducts = createAction('GET_PRODUCTS')

export default createReducer(INITIAL_STATE, {
    [addProduct.type] : (state) => {
        return [...state]
    },

    [getProducts.type] : (state, action) => {
        return [...action.payload]
    },
})