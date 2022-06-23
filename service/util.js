export const util = (() => {
  /**
   * snake -> camel
   * SAMPLE_VARIABLE -> sampleVariable
   *
   * @param value
   * @returns {string}
   */
  function toCamelCase(value) {
    return value.toLowerCase().replace(/_[a-z]/g, (str) => str[1].toUpperCase());
  }
  /**
   * snake -> camel
   * PREFIX_SAMPLE_VARIABLE -> sampleVariable
   *
   * @param value
   * @returns {string}
   */
  function prefixRemoveToCamelCase(value, prefix) {
    return value.replace(new RegExp(prefix, 'g'), '').toLowerCase().replace(/_[a-z]/g, (str) => str[1].toUpperCase());
  }

  function addZero(value) {
    return value > 10 ? value : `0${value}`;
  }

  /**
   * 날짜 포맷
   * @param value
   * @param delimiter
   * @returns {string}
   */
  function dateFormat(value, delimiter = '-') {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return [addZero(year), addZero(month), addZero(day)].join(delimiter);
  }

  return {
    toCamelCase,
    prefixRemoveToCamelCase,
    dateFormat,
  };
})();

export default {};
