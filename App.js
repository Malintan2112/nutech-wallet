
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import MainStore from './App/Redux'

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme
} from 'react-native'
import AppNavigation from './App/Navigation/AppNavigation'
import Colors from './App/Constants/Colors'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const { store } = MainStore
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={MainStore.persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle='dark-content' backgroundColor={Colors.WHITE_COLOR} />
          <AppNavigation />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400'
  },
  highlight: {
    fontWeight: '700'
  }
})

export default App
