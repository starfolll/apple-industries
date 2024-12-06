import { formatInTimeZone, toZonedTime } from 'date-fns-tz'
import { enUS } from 'date-fns/locale/en-US'

export const dateTimeZoneUS_NY = 'America/New_York'

export function dateUTCToFormatUS_NY(dateUTC: string) {
  return formatInTimeZone(
    new Date(dateUTC),
    dateTimeZoneUS_NY,
    'yyyy-MM-dd HH:mm:ss zzz',
    {
      locale: enUS,
    },
  )
}

export function dateUTCToLocalDateUS_NY(dateUTC: string): Date {
  return toZonedTime(new Date(dateUTC), dateTimeZoneUS_NY)
}
