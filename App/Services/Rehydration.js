import ReduxPersist from '../Config/ReduxPersist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore } from 'redux-persist'
// import StartupActions from '../Redux/StartupRedux'
import DebugConfig from '../Config/DebugConfig'

const updateReducers = (store, isServer) => {
  const reducerVersion = ReduxPersist.reducerVersion
  // const startup = () => store.dispatch(StartupActions.startup())
  // Check to ensure latest reducer version
  const persistor = persistStore(store, null)
  AsyncStorage.getItem('reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      if (DebugConfig.useReactotron) {
        console.tron.display({
          name: 'PURGE',
          value: {
            'Old Version:': localVersion,
            'New Version:': reducerVersion
          },
          preview: 'Reducer Version Change Detected',
          important: true
        })
      }
      // Purge store
      persistor.purge()
      AsyncStorage.setItem('minicart_id', '')
      AsyncStorage.setItem('access_token', '')
      AsyncStorage.setItem('auth', '')
      AsyncStorage.setItem('reducerVersion', reducerVersion)
    }
  }).catch(() => {
    AsyncStorage.setItem('reducerVersion', reducerVersion)
  })
  return persistor
}

export default { updateReducers }
