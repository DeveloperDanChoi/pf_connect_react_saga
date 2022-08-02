/* eslint-disable no-restricted-syntax,guard-for-in,no-param-reassign */
import { util } from './util';

export const reduxModule = (() => {
  /**
   * 모듈 typeName<br>
   * create: { type: put, name: TAMS_GOOGLE_CALENDAR_SETTING }<br>
   * -> PUT_TAMS_GOOGLE_CALENDAR_SETTING<br>
   * get: connect/googleCalendar/PUT_TAMS_GOOGLE_CALENDAR_SETTING<br>
   * -> { type: put, name: TAMS_GOOGLE_CALENDAR_SETTING }<br>
   */
  const typeName = {
    create: ({ type, name }) => `${type.toUpperCase()}_${name}`,
    get: (str) => {
      console.log(str)
      const orignalKey = str.split('/');
      const names = orignalKey[orignalKey.length - 1].split('_');
      return { type: names[0].toLowerCase(), name: names.splice(1).join('_') };
    },
  };

  /**
   * 기초 데이터를 기준으로 모듈 관리<br>
   * @type {{get: ((function(*, *): (*))|*), create: (function(*, *): {types: {}, creators: {}})}}
   */
  const modules = {
    create: (initialModules, connectType) => {
      // eslint-disable-next-line no-param-reassign
      const prefix = `connect/${connectType}/`;
      const types = {};
      const creators = {};
      let moduleKey = '';

      for (const module of initialModules) {
        // key = `${module.type.toUpperCase()}_${module.name}`;
        moduleKey = typeName.create(module);
        const value = prefix + moduleKey;
        types[moduleKey] = value;
        creators[util.toCamelCase(moduleKey)] = (data) => ({ type: value, data });
      }
      return {
        types,
        creators,
      };
    },
    get: (initialModules, data) => {
      for (const module of initialModules) {
        if (module.type === data.type && module.name === data.name) {
          return module;
        }
      }
      return {};
    },
    sets: (oldData, newData) => {
      for (const key in oldData) {
        switch (typeof newData[key]) {
          case 'boolean':
            oldData[key] = String(newData[key]);
            break;
          default:
            oldData[key] = newData[key];
        }
      }
    },
    validate: (data, values) => {
      let msg = '';

      for (const key of data) {
        switch (key.type) {
          case 'string':
            if (values[key.name] === null || values[key.name] === '') {
              msg = key.msg;
              break;
            }
            break;
          case 'array':
            if (values[key.name] === null || values[key.name].length === 0) {
              msg = key.msg;
              break;
            }
            break;
          default:
        }
      }

      return msg;
    },
  };

  /**
   * @deprecated
   * @param initialModules
   * @returns {*[]}
   */
  function addWatch(initialModules) {
    const watch = [];
    for (const module of initialModules) {
      console.log(module);
    }
    return watch;
  }

  return {
    modules,
    addWatch,
    typeName,
  };
})();

export default {};
