/* eslint-disable react/jsx-props-no-spreading,react-hooks/rules-of-hooks,no-unused-vars */
import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import {
  open, close,
} from '../../store/modal/modal';

const modalWarapper = ({ content, mainClassName, overlayBg }) => {
  const dispatch = useDispatch();
  const [fadeIn, setFadeIn] = useState(null);

  useEffect(() => {
    setFadeIn('in');
    return () => {
      setFadeIn(null);
    };
  }, []);

  const handleClose = (e) => {
    dispatch(close());
  };

  return (<>
    <div id="modalWrapper" style={{
      position: 'absolute',
      zIndex: 9,
      top: 0,
      height: 'inherit',
      background: 'white',
    }}>
      <div>
        <div><button onClick={handleClose}>X</button></div>
        <div className="modal-content">
          <div className={mainClassName}>
            {content}
          </div>
        </div>
      </div>
    </div>
    { overlayBg && <div className={'overlay'} onClick={handleClose} /> }
  </>);
};

export default modalWarapper;

export const Portal = {
  open: (options) => open(modalWarapper, options),
};
