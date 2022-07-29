import React, { useRef } from 'react';

import { useDispatch } from 'react-redux';
import { Portal } from '../../modal/Portal';
import ImageCropper from '../../modal/cropper/ImageCropper';
// import {getPublicAssetPath} from "../../../lib/assetHelper";
// import {template1} from "../../../service/connect";

const Thumbnail = ({ state, parent }) => {
  const dispatch = useDispatch();

  const fileRef = useRef('');

  const handleUpload = () => {
    const event = new MouseEvent('click', {
      view: window,
      cancelable: true,
    });
    fileRef.current.dispatchEvent(event);
  };

  const handleChange = (e) => {
    const { files } = e.target;

    if (files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        const base64 = reader.result;
        if (base64) {
          dispatch(
            Portal.open({
              content: <ImageCropper src={base64.toString()} parent={parent} />,
              overlayBg: true,
            }),
          );
        }
        e.target.value = '';
      };
    }
  };

  return (<>
    <a href='#none' className='btn-profile' onClick={handleUpload}>
      <img src={state.input.botThumbnailUrl} /><span>Edit</span>
      <input type="file" onChange={handleChange} ref={fileRef} style={{ display: 'none' }} />
    </a>
  </>);
};

export default Thumbnail;
