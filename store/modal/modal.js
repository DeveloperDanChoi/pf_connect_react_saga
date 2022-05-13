import produce from '../../lib/produce';

export const OPEN = 'modal/OPEN';
export const CLOSE = 'modal/CLOSE';

export const open = (modalComponent, modalProps) => ({
  type: OPEN,
  data: { modalComponent, modalProps },
});

export const close = () => ({ type: CLOSE });

const initialState = {
  open: false,
};

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case OPEN:
      return {
        modalComponent: action.data.modalComponent,
        modalProps: { ...action.data.modalProps },
      };
    case CLOSE:
      return null;
    default:
      break;
  }
});

export default reducer;
