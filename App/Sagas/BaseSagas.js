import { take, fork } from 'redux-saga/effects'
import { END } from 'redux-saga'

export function* baseListen(type, fetchSaga, api, token, getStoreNewRetailData) {
  let action = yield take(type)
  while (action !== END) {
    if (token) {
      yield fork(fetchSaga, api, token, action, getStoreNewRetailData)
    } else {
      yield fork(fetchSaga, api, action, getStoreNewRetailData)
    }
    action = yield take(type)
  }
}

