/**
 * Returns the error message if the form field has been touched.
 *
 * @param {string | any | undefined} message - The error message to display.
 * @param {boolean | any | undefined} isTouched - Indicates whether the field has been touched.
 * @returns {string | undefined} The error message if touched, otherwise undefined.
 */
export const getFormErrorMessage = (message: string | any | undefined, isTouched: boolean | any | undefined): string | undefined => {
  if (!isTouched) {
    return;
  }
  return message;
};
