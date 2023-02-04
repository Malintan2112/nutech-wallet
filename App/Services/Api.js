// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// let apiUrl = config.apiURL
let apiUrl = 'https://jsonplaceholder.typicode.com'


// our "constructor"
const create = (baseURL = apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const apiWrapper = apisauce.create({
    // base URL is read from the "constructor"
    // baseURL: 'https://tokped.wapi.ruparupastg.my.id/',
    baseURL: apiUrl,
    headers: {
      'X-Frontend-Type': 'mobile',
      'x-company-name': 'nomura',
      'x-apps-name': 'nomura',
      'user-platform': 'mobile'
    },
    // 10 second timeout...
    // http://139103.ricky:139103in@10.1.32.203:3128
    timeout: 20000
    // proxy: {
    //   host: '10.1.32.203',
    //   port: 3128,
    //   auth: {
    //     username: '139103.ricky',
    //     password: '139103in'
    //   }
    // }
  })


  const headerWithToken = (authorization) => {
    return {
      headers: {
        authorization
      }
    }
  }

  // Wrap api's addMonitor to allow the calling code to attach
  // additional monitors in the future.  But only in __DEV__ and only
  // if we've attached Reactotron to console (it isn't during unit tests).
  if (__DEV__) {
    const naviMonitor = (response) => console.log('API DEBUG! response =', response)
    apiWrapper.addMonitor(naviMonitor)
  }


  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  // banner
  const getBanner = () => {
    return apiWrapper.get('/todos/')
  }



  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getBanner,

  }
}

// let's return back our create method as the default.
export default {
  create
}
