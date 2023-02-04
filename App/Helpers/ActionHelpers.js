
export const numberWithCommas = x =>
  parseInt(x)
    ? String(parseInt(x)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    : String(x).replace(/\B(?=(\d{3})+(?!\d))/g, '.')

export const getInitials = (fullName) => {
  const allNames = fullName.trim().split(' ')
  const initials = allNames.reduce((acc, curr, index) => {
    if (index === 0 || index === allNames.length - 1) {
      acc = `${acc}${curr.charAt(0).toUpperCase()}`
    }
    return acc
  }, '')
  return initials
}

export const maskString = (str, mask, n = 1, from = 'start') => {
  // Slice the string and replace with
  // mask then add remaining string
  // n === to how many we 'not want' to mask

  if (from === 'start') { // ###asd@gmail.com
    return ('' + str).slice(0, -n).replace(/./g, mask) + ('' + str).slice(-n)
  } else if (from === 'end') { // asdasd@gmail.###
    return str.slice(0, n) + str.slice(n, str.length).replace(/./g, mask)
  }
}
const ActionHelpers = { numberWithCommas, getInitials, maskString }

export default ActionHelpers
