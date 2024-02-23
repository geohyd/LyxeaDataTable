/**
 *
 * Convert a string into a formatted string depend on the data structure you provide
 *
 * example:
 * string: "ujusbdq{example}nfkjlnsfkj"
 * dataset: {example: "FOO"}
 * output = "ujusbdqFOOnfkjlnsfkj"
 *
 * @param {string} url
 * @param {{ [key: string]: any }} rowData
 * @returns {string}
 */
declare const parseStringWithData: (
  url: string,
  rowData: {
    [key: string]: any;
  }
) => string;
export default parseStringWithData;
