import Router from "next/router";

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

  /**
   * 이미지 전송을 위해 변환<br>
   * @param data
   * @returns {FormData}
   */
  function convertFormData(data) {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    return formData;
  }

  function base64ToBlob(base64) {
    if (!base64) return "";
    if (base64.substr(0,4) !== 'data') return base64;

    var base64ToBlob = function(base64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;

      var byteCharacters = atob(base64Data);
      var byteArrays = [];

      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      var blob = new Blob(byteArrays, { type: contentType });

      return blob;
    }

    var block = base64.split(';');

    // 이미지의 컨텐츠 유형을 얻는다.
    var contentType = block[0].split(':')[1]; // 이 경우 'image/jpeg', 'image/png', 'image/gif'

    // 이미지의 순수 데이터를 얻는다.
    var realData = block[1].split(',')[1]; // 이 경우 '/gj.........Tf/5z0L/2vs1lb4eGcnUco//Z'

    // 이미지의 순수 데이터를 Blob 유형으로 변환한다.
    var blob = base64ToBlob(realData, contentType);

    return blob;
  }

  /**
   * TODO: 라이브 필히 삭제
   * @deprecated
   */
  function devCase1(router, type, id, isCreate = true) {
    console.log( router.query.id , isCreate)
    if (isCreate) return;
    if (!router.query.id) {
      const prefix = '/app/connect';
      router.push(`${prefix}/${type}?id=${id}`, `${prefix}/${type}`);
    }
  }

  return {
    toCamelCase,
    prefixRemoveToCamelCase,
    dateFormat,
    convertFormData,
    base64ToBlob,
    devCase1,
  };
})();

export default {};
