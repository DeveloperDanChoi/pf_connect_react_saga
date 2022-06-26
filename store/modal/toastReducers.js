import produce from "../../lib/produce";

export const initialState = {
  modalComponent: null,
  modalProps: {
	toastArr: []
  }
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
	switch (action.type) {
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
	  case "slice_toast":
		let filtering = _.filter(state.modalProps.toastArr, (toast)=>toast.timestamp !== action.data)
		draft.modalProps = { toastArr: filtering }
		break;
	  case "hide_toast":
		draft.modalComponent = null;
		draft.modalProps = {
		  toastArr: []
		}
		break;
	  default:
		break;
	}
  });

export default reducer;
