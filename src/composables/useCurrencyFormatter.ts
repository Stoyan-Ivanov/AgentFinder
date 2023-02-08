/**
 * @param x - number that should be formatted
 * @returns a formatted number that includes "," between the thousands (e.g "10000" -> "10,000")
 */
export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
