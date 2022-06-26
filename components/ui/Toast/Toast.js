import React, {useEffect, useState} from 'react';

import {closeLargeModalAction, hideToast, showToast, sliceToast} from '../../../store/modal/modal';
import {useDispatch} from "react-redux";
import {closeBtnStyle, containerStyle, div1Style, toastDomStyle, typeIconStyle} from "./ToastConstStyle";
import Parser from "html-react-parser";
// import useL10n from "../../../lib/hooks/useL10n";

const ToastTemplate = ({toastArr = []}) => {
  const dispatch = useDispatch();

  // const t = useL10n();
  const [toastTimestamp, setToastTimestamp] = useState(0);

  const toastType = {
	'success' : {color: 'var(--jnd-base-hover-opac095-color)', icon: 'icon-check-circle'},
	'warning' : {color: 'rgba(241, 165, 46, 0.95)', icon: 'icon-warning-triangle-fill'},
	'error' : {color: 'rgba(227, 79, 79, 0.95)', icon: 'icon-warning-fill'},
	'caution' : {color: 'rgba(236, 86, 31, 0.95)', icon: 'icon-warning-triangle'},
  }

  useEffect(() => {
	if (toastArr.length > 0) {
	  if (toastTimestamp !== toastArr[toastArr.length-1].timestamp) {
		setToastTimestamp(toastArr[toastArr.length-1].timestamp);

		setTimeout(() => {
		  dispatch(sliceToast(toastArr[toastArr.length-1].timestamp));
		}, toastArr[toastArr.length-1].duration)
	  }
	}
  }, [toastArr]);

  return (
	  <React.Fragment>
		{ toastArr.map((toast, idx) => {
		  return (
			  <div key={idx} id="toast-container" className="toast-top-center" style={containerStyle(idx)}>
				<div style={div1Style}>
				  <div className="c-toast-success"
					   style={toastDomStyle(toastType[toast.type].color)}
					   onClick={()=>dispatch(hideToast())}>
					<i className="icon-delete toast-close-button" style={closeBtnStyle} onClick={()=>dispatch(hideToast())}/>
					<i className={`status-icon ${toastType[toast.type].icon}`} style={typeIconStyle}/>

					<div className="toast-text" style={{fontWeight: '600', lineHeight: '22px'}}>
					  <div className="toast-title" style={{fontWeight: '700'}}>
						<div className="block-col" style={{display: 'flex', width:'100%'}}>
						  <p className="col-left" style={{flex: '1 1 auto', overflow: 'hidden'}}>
							{ toast.title && <p className="p-title">{Parser(toast.title)}</p> }
							{Parser(toast.msg)}
						  </p>
						  {toast.reload &&
						  <div className="col-right" style={{flex: '0 0 auto', padding: '0 12px 0 20px'}}>
								<span className="btn-action fn-u _linkButton" style={{fontWeight: 'normal', fontSize: '14px'}}
										onClick={() => location.reload()}>
									{t('@common-refresh')}
								</span>
						  </div>}
						</div>
					  </div>
					</div>

				  </div>
				</div>
			  </div>
		  )
		}) }
	  </React.Fragment>
  );
};

export default ToastTemplate;

export const Toast = {
  show: (options) => showToast(ToastTemplate, options),
};
