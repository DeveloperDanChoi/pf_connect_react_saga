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

  /**
   * 리덕스 모듈 생성
   */
  function createModule(initialModules) {
    const prefix = 'connect/googleCalendar/';
    const types = {};
    const creators = {};
    let key = '';

    for (const module of initialModules) {
      key = `${module.type.toUpperCase()}_${module.name}`;
      const value = prefix + key;
      types[key] = value;
      creators[util.toCamelCase(key)] = (data) => ({ type: value, data });
    }
    return {
      types,
      creators,
    };
  }
  function addWatch(initialModules) {
    const watch = [];
    for (const module of initialModules) {
      console.log( module )
    }
    return watch;
  }
  return {
    toCamelCase,
    prefixRemoveToCamelCase,
    createModule,
    addWatch,
  };
})();

export default {};
