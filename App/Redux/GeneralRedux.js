// @flow
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    generalRequest: null,
    generalSuccess: ['data'],
    generalFailure: ['err']
})

export const GeneralTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    data: null,
    err: null,

})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state.merge({
    fetching: true,
    err: null
})

// we've successfully logged in
export const success = (state: Object, { data }: Object) =>
    state.merge({
        fetching: false,
        err: null,
        data
    })


export const failure = (state: Object, { err }: any) => {
    return state.merge({
        fetching: false,
        err
    })
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GENERAL_SUCCESS]: success,
    [Types.GENERAL_REQUEST]: request,
    [Types.GENERAL_FAILURE]: failure,
})
