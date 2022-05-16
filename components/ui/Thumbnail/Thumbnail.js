import React from 'react';

import { useDispatch } from 'react-redux';
import { Portal } from '../../modal/Portal';
import ImageCropper from '../../modal/cropper/ImageCropper';

const Thumbnail = ({ state, parent }) => {
  const dispatch = useDispatch();

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

  return (<div className={'dev-focus'}>
    <img src={state.input.thumbnail} />
    <input type="file" onChange={handleChange} />
  </div>);
};

export default Thumbnail;
