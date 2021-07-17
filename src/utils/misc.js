// @flow

/**
 * Prepends a 0 if below 10.
 * @param {number} input The number.
 * @returns {string} The string with 0 if needed.
 */
function prepend0IfNeeded(input: number): string {
  return input < 10 ? `0${input}` : input.toString()
}

/**
 * Gets a Date as a nice format.
 * @param {Date} date The input date.
 * @returns {string} The formatted date.
 */
export function getFormattedDate(date: Date): string {
  return `${date.getHours()}:${prepend0IfNeeded(
    date.getMinutes()
  )}:${prepend0IfNeeded(date.getSeconds())}:${date.getMilliseconds()}`
}

/**
 * Checks if in Electron or not.
 * @returns {boolean} If in Electron.
 */
export function isElectronApp(): boolean {
  return navigator.userAgent.includes('Electron')
}
