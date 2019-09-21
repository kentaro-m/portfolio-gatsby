import moment from 'moment'

export const createAbsoluteUri = (baseUrl, relativeUri) => {
  return baseUrl + relativeUri
}

export const createDateFormat = (date, format) => {
  return moment(date).format(format)
}