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
const parseStringWithData = (
  url: string,
  rowData: { [key: string]: any }
): string => {
  const matches = Array.from(url.matchAll(/\{(.+?)\}/g));
  const result = Array.from(matches)
    .filter((match) => match[1] !== '}{')
    .map((match) => match[1]);

  const params = Array.from(new Set(result));

  if (!params.length) return url;
  params.forEach((param) => {
    if (url.includes(`{${param}}`) && rowData[param]) {
      url = url.replaceAll(`{${param}}`, rowData[param]);
    }
  });

  return url;
};

export default parseStringWithData;
