module.exports = {
  project: {
    ios: {},
    android: {} // grouped into "project"
  },
  assets: ['./App/Assets/Fonts/Poppins'], // stays the same
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null
      }
    }
  }
}
