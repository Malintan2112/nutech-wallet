// @flow
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    setData: ['err']
})

export const GeneralTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    data: null,

})

/* ------------- Reducers ------------- */



// we've successfully logged in
export const setData = (state: Object, { data }: Object) =>
    state.merge({
        fetching: false,
        err: null,
        data
    })


/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_DATA]: setData,
})
