export function formatDate (date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  return new Date(date + 'T00:00').toLocaleDateString('en', options)
}
