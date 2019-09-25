import moment from 'moment'

export const createAbsoluteUri = (
  baseUrl: string,
  relativeUri: string
): string => {
  return baseUrl + relativeUri
}

export const createDateFormat = (
  date: moment.MomentInput,
  format: string
): string => {
  return moment(date).format(format)
}
