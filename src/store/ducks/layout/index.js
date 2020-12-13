 import { createAction, createReducer } from "@reduxjs/toolkit"

const INITIAL_STATE = {
    messages: [],
    showMessage: false
}

export const showMessage = createAction('SHOW_MESSAGE')
export const hideMessage = createAction('HIDE_MESSAGE')
export const addMessage = createAction('ADD_MESSAGE')
export const removeMessage = createAction('REMOVE_MESSAGE')

export default createReducer(INITIAL_STATE,{
    [showMessage.type]: (state) =>  ({...state, showMessage: true}),
    [hideMessage.type]: (state) =>  ({...state, showMessage: false}),
    [addMessage.type]: (state, action) =>  ({...state, messages:[...state.messages, action.payload  ]}),
    [removeMessage.type]: (state, action) =>  ({...state, messages: state.messages.filter(msg=> msg !== action.payload)}),
})