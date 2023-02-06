
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

export const capitalizeEachWord = (str) => {
  const arr = str.toLowerCase().split(' ')
  for (let i = 0; i < arr.length; i++) {
    (arr[i] === 'dki' || arr[i] === 'd.i.' || arr[i] === 'nad' || arr[i] === 'ntb' || arr[i] === 'ntt')
      ? arr[i] = arr[i].toUpperCase()
      : arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
  }
  const str2 = arr.join(' ')
  return str2
}
const ActionHelpers = { numberWithCommas, getInitials, maskString, capitalizeEachWord }

export default ActionHelpers
