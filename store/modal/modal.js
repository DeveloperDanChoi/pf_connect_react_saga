import produce from '../../lib/produce';

export const OPEN = 'modal/OPEN';
export const CLOSE = 'modal/CLOSE';

export const open = (modalComponent, modalProps) => ({
  type: OPEN,
  data: { modalComponent, modalProps },
});

export const close = () => ({ type: CLOSE });

export const showToast = (modalComponent, modalProps) => ({
  type: "show_toast",
  data: { modalComponent, modalProps },
})

const initialState = {
  open: false,
  modalProps: {
    toastArr: []
  }
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
    case "show_toast":
      let _toastArr = (draft && draft.modalProps.toastArr) ? draft.modalProps.toastArr : [];
      _toastArr.push({
        title: action.data.modalProps.title ? action.data.modalProps.title : '',
        reload: action.data.modalProps.reload ? action.data.modalProps.reload : false,
        msg: action.data.modalProps.msg ? action.data.modalProps.msg : '',
        type: action.data.modalProps.type ? action.data.modalProps.type : 'success',
        duration: action.data.modalProps.duration ? action.data.modalProps.duration : 3000,
        timestamp: new Date().getTime()
      });

      draft.modalComponent = action.data.modalComponent;
      draft.modalProps = { toastArr: JSON.parse(JSON.stringify(_toastArr)) }
      break;
    default:
      break;
  }
});

export default reducer;
