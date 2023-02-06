import dayjs from 'dayjs'
import 'dayjs/locale/id'
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
dayjs.locale('id')

// 25 Desember 2020 18:00
export const formatLLL = (date) => date ? dayjs(date).format('D MMMM YYYY H:mm') : ''
export const formatLLLWithDay = (date) => {
  if (date) {
    const dateString = dayjs(date).format('D MMMM YYYY')
    const dayString = new Date(date)
    return `${days[dayString.getDay()]}, ${dateString}`
  } else return ''
}

// 25 Des 20 | 18:00
export const formatWithSeparator = (date) => date ? dayjs(date).format('DD MMM YY | HH:mm') : ''

// 25 Desember 2020
export const formatCommonDate = (date) => date ? dayjs(date).format('D MMMM YYYY') : ''
