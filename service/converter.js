export const converter = (() => {
  const statusClss = (value) => (value === 'enabled' ? 'switch on' : 'switch');

  return {
    statusClss,
  };
})();

export default {};
