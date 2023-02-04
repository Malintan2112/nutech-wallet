import { all, fork } from 'redux-saga/effects'
import API from '../Services/Api'
import { fetchGeneral } from './GeneralSagas'
import GetLocalData from '../Services/GetLocalData'



const api = API.create()
const token = GetLocalData.getToken


function* ClientSagas() {
    yield all([
        fork(fetchGeneral, api, token),
    ])

}


export default function* root() {
    yield all([
        fork(ClientSagas),
    ])
}