import { call, put, all } from 'redux-saga/effects'
import GeneralActions, { GeneralTypes } from '../Redux/GeneralRedux'
import { baseListen } from './BaseSagas'

// listen to action
export function* fetchGeneral(api) {
    yield baseListen(GeneralTypes.GENERAL_REQUEST,
        fetchGeneralAPI,
        api)
}

// Fetch Mobile Banner (Worker)
export function* fetchGeneralAPI(api, { data }) {
    try {
        let resBanner = {}

        resBanner = yield call(api.getBanner)

        // missing atf
        if (!resBanner.ok) {
            if (resBanner.problem === 'NETWORK_ERROR') {
                yield put(GeneralActions.generalFailure('Terjadi kesalahan koneksi'))
            }
            yield put(GeneralActions.generalFailure('Terjadi kesalahan koneksi'))
        } else {
            if (!resBanner.data.error) {
                const { data: dataBanner } = resBanner
                yield put(GeneralActions.generalSuccess(dataBanner))
            } else {
                yield put(GeneralActions.generalFailure(resBanner.data.message))
            }
        }
    } catch (e) {
        yield all([
            put(GeneralActions.generalFailure())
        ])
    }
}
