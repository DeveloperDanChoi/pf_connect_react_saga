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
  function createModule(initialModules, connectType) {
    // eslint-disable-next-line no-param-reassign
    const prefix = `connect/${connectType}/`;
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

  /**
   * @deprecated
   * @param initialModules
   * @returns {*[]}
   */
  function addWatch(initialModules) {
    const watch = [];
    for (const module of initialModules) {
      console.log( module )
    }
    return watch;
  }

  function addZero(value) {
    return value > 10 ? value : '0' + value;
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
    createModule,
    addWatch,
    dateFormat,
  };
})();

export default {};