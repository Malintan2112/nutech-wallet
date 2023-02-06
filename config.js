import localConfig from './localConfig.js'
const config = {
  DEBUG: localConfig?.DEBUG,
  developmentENV: localConfig?.developmentENV || 'stg',
  showTahuTextInput: localConfig?.showTahu || false,
  codePushDev: localConfig?.codePushDev || false,
  codePushProd: localConfig?.codePushProd || false,
  stgApiURL: 'https://tht-api.nutech-integrasi.app',
  apiURL: 'http://192.168.1.8:8000'
}

export default config
