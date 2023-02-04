/**
 * Session Library
 */
import AsyncStorage from '@react-native-async-storage/async-storage'

const TAG = 'Sessions Helper'
/**
 * Session Keys
 */
/**
 * Session store variables for User Profile
 */
export const IS_LOGIN = 'IS_LOGIN'
export const API_TOKEN = 'API_TOKEN'
export const USER_DATA = 'USER_DATA'

export const FCM_TOKEN = 'FcmToken'
export const USER_ID = 'UserID'
export const USER_NAME = 'UserName'
export const USER_PIC = 'UserPic'
export const FULL_NAME = 'FullName'
export const USER_ADDRESS = 'UserAddress'
export const USER_PHONE = 'UserPhone'
export const USER_CITIZEN_ID = 'UserCitizenId'
export const USER_EMAIL = 'UserEmail'
export const USER_ROLE = 'UserRole'
export const USER_ROLE_ID = 'UserRoleID'
export const USER_PHOTO = 'UserPhoto'
export const NOTIF_DATA = 'NotifData'
export const PRINTER = 'PRINTER'

export const INCIDENT_REPORT_ID = 'IncidentReportId'
export const CURRENT_INCIDENT_REPORT_STATUS = 'CurrentIncidentReportStatus'
export const TOGGLE_POLICE_ACTIVE = 'TogglePoliceActive'

export const POLICE_DISPATCH = 'PoliceDispatch'
export const POLICE_NOTIF_STATUS = 'PoliceNotifStatus'
export const REPORT_FINISH = 'ReportFinish'

export const POLICE_CALL_CENTER = 'PoliceCallCenter'

export const LANGUAGE = 'LANGUAGE'

/**
 * Session store variables for Other
 */
export const APP_VERSION = 'AppVersion'
export const LANG = 'Language'

let DATA_SESSION = {}
const SESSION_KEY = '@Session' // ini sebagai penanda di Asyncstorage bahwa ini adalah variabel untuk session

/**
 * Set Session value by key
 *
 * @param {String} key - Session key to set
 * @param {Any} value - Value of session key
 *
 * @return {Boolean}
 */
export function setValue (key, value) {
  try {
    if (!DATA_SESSION) {
      DATA_SESSION = {}
    }

    DATA_SESSION[key] = value

    const sessionData = JSON.stringify(DATA_SESSION)
    console.log(TAG + ' setValue', 'Key: ' + key, 'Value: ' + value)
    AsyncStorage.setItem(SESSION_KEY, sessionData)
    return true
  } catch (error) {
    console.log(TAG + ' setValue Error', error)
    return false
  }
}

/**
 * Get Session Value based on key
 *
 * @param {String} key - Session Key to get
 * @param {Any} default_value (optional) - return value if the session key is undefined
 *
 * @return {Any} Value of Session key
 */
export function getValue (key, default_value = '') {
  try {
    const value = DATA_SESSION[key]
    console.log(
      TAG + ' getValue',
      'Key: ' + SESSION_KEY + key,
      'Value: ' + value
    )
    return value || default_value
  } catch (e) {
    return default_value
  }
}

/**
 * @void Destroy Session
 */
export function destroy () {
  DATA_SESSION = {}
  AsyncStorage.removeItem(SESSION_KEY)
}

/**
 * Prepare Session Data
 * @return {Promise}
 */
export function prepare () {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(SESSION_KEY)
      .then(value => {
        DATA_SESSION = JSON.parse(value)
        console.log(`${TAG} prepare`, DATA_SESSION)
        resolve(DATA_SESSION)
      })
      .catch(err => {
        console.log(`${TAG} prepare Error`, err)
        reject(err)
      })
  })
}
