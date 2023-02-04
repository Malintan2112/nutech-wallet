import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas'
import ReduxPersist from '../Config/ReduxPersist'

import { reducer as generalRedux } from './GeneralRedux'
import { reducer as tempRedux } from './TempRedux'



const reducers = {
    general: generalRedux,
    temp: tempRedux
}

let finalReducers = reducers
if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, combineReducers(Object.assign({}, reducers)))
}

let { store, persistor, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)
if (module.hot) {
    module.hot.accept(() => {
        const nextRootReducer = require('.').reducers
        store.replaceReducer(nextRootReducer)

        const newYieldedSagas = require('../Sagas').default
        sagasManager.cancel()
        sagasManager.done.then(() => {
            sagasManager = sagaMiddleware.run(newYieldedSagas)
        })
    })
}
export default { store, persistor }