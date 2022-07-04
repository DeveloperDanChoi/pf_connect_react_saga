import React, { useEffect, useState } from 'react';

import Parser from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { hideToast, showToast, sliceToast } from '../../../store/modal/modal';
import {
  closeBtnStyle, containerStyle, div1Style, toastDomStyle, typeIconStyle,
} from './ToastConstStyle';
// import useL10n from "../../../lib/hooks/useL10n";

const ToastTemplate = ({ toastArr = [] }) => {
  const dispatch = useDispatch();

  // const t = useL10n();
  const [toastTimestamp, setToastTimestamp] = useState(0);

  const toastType = {
    success: { color: 'var(--jnd-base-hover-opac095-color)', icon: 'icon-check-circle' },
    warning: { color: 'rgba(241, 165, 46, 0.95)', icon: 'icon-warning-triangle-fill' },
    // eslint-disable-next-line no-mixed-spaces-and-tabs,no-tabs
	  error: { color: 'rgba(227, 79, 79, 0.95)', icon: 'icon-warning-fill' },
    // eslint-disable-next-line no-mixed-spaces-and-tabs,no-tabs
	  caution: { color: 'rgba(236, 86, 31, 0.95)', icon: 'icon-warning-triangle' },
  };

  useEffect(() => {
    if (toastArr.length > 0) {
      if (toastTimestamp !== toastArr[toastArr.length - 1].timestamp) {
        setToastTimestamp(toastArr[toastArr.length - 1].timestamp);

        setTimeout(() => {
          // eslint-disable-next-line no-mixed-spaces-and-tabs,no-tabs
		  dispatch(sliceToast(toastArr[toastArr.length - 1].timestamp));
        }, toastArr[toastArr.length - 1].duration);
        // eslint-disable-next-line no-mixed-spaces-and-tabs,no-tabs
	  }
    }
  }, [toastArr]);

  return (
  // eslint-disable-next-line no-mixed-spaces-and-tabs,no-tabs
	  <React.Fragment>			{/* eslint-disable-next-line no-tabs */}
			{ toastArr.map((toast, idx) => (
        <div key={idx} id="toast-container" className="toast-top-center" style={containerStyle(idx)}>
        <div style={div1Style}>
          <div className="c-toast-success"
            style={toastDomStyle(toastType[toast.type].color)}
            onClick={() => dispatch(hideToast())}>
            <i className="icon-delete toast-close-button" style={closeBtnStyle} onClick={ () => dispatch(hideToast())}/>
            <i className={`status-icon ${toastType[toast.type].icon}`} style={typeIconStyle}/>

            <div className="toast-text" style={{ fontWeight: '600', lineHeight: '22px' }}>
            <div className="toast-title" style={{ fontWeight: '700' }}>
            <div className="block-col" style={{ display: 'flex', width: '100%' }}>
              <p className="col-left" style={{ flex: '1 1 auto', overflow: 'hidden' }}>
              { toast.title && <p className="p-title">{Parser(toast.title)}</p> }
              {Parser(toast.msg)}
              </p>
              {toast.reload
              && <div className="col-right" style={{ flex: '0 0 auto', padding: '0 12px 0 20px' }}>
                <span className="btn-action fn-u _linkButton" style={{ fontWeight: 'normal', fontSize: '14px' }}
                  >
                </span>
              </div>}
            </div>
            </div>
          </div>

          </div>
        </div>
        </div>)) }
     </React.Fragment>
  );
};

export default ToastTemplate;

export const Toast = {
  show: (options) => showToast(ToastTemplate, options),
};
