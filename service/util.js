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
  return {
    toCamelCase,
    prefixRemoveToCamelCase,
  };
})();

export default {};
