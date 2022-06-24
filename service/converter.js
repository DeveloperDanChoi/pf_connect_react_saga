export const converter = (() => {
  const statusClss = (value) => (value === 'enabled' ? 'switch on' : 'switch');
  const statusText = (value) => (value === 'enabled' ? '작동중' : '중지됨');

  return {
    statusClss,
    statusText,
  };
})();

export default {};
