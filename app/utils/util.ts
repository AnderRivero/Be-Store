export const getMonthDates = (month: string, year: string) => {
  const firstDate = new Date(+year, +month - 1, 1)
  const lastDate = new Date(+year, +month, 0)
  return { firstDate, lastDate }
}
