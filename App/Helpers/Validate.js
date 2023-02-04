import { includes, isEmpty } from 'lodash-es'
import validate from 'validate.js'
import Constraints from './Constraints'

export const useValidate = (form = {}, setStateErrors = null) => {
  let isError = false
  const forms = {}
  const errors = {}
  for (const dataObj in form) {
    const isErrorObj = includes(dataObj, 'Error')
    if (!isErrorObj) forms[dataObj] = form?.[dataObj] ?? ''
  }
  const result = validate(forms, Constraints)
  for (const resForms in forms) {
    errors[`${resForms}Error`] = ''
    for (const resErr in result) if (resErr === resForms) errors[`${resForms}Error`] = !isEmpty(result?.[resErr]?.[0]) ? result?.[resErr]?.[0] : ''
  }
  for (const errorValue in errors) {
    isError = !isEmpty(errors[errorValue])
    if (isError) break
  }
  if (typeof setStateErrors === 'function') setStateErrors(state => ({ ...state, ...errors }))
  return { form, errors, isError }
}
