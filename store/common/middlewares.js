import _ from 'lodash';

const middleware = (store) => (next) => (action) => {
  const result = next(action);

  switch (action.type) {
    default:
      break;
  }

  return result;
};

export default middleware;
