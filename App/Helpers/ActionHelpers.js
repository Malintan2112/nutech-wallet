
export const NumberWithCommas = x =>
    parseInt(x)
        ? String(parseInt(x)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        : String(x).replace(/\B(?=(\d{3})+(?!\d))/g, '.');


const ActionHelpers = { NumberWithCommas }

export default ActionHelpers