// eslint-disable-next-line max-len
/* eslint-disable react/jsx-props-no-spreading,react-hooks/rules-of-hooks,import/no-extraneous-dependencies */
import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { useDispatch } from 'react-redux';
import { close } from '../../../store/modal/modal';

const ImageCropper = ({ src, parent }) => {
  const dispatch = useDispatch();
  const cropperRef = useRef();

  const handleClose = () => {
    dispatch(close());
  };
  const handleOK = () => {
    cropperRef.current.cropper.getCroppedCanvas().toBlob((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onloadend = () => {
        const base64 = reader.result;

        if (base64) {
          // dispatch(thumbnail(base64.toString()));
          parent.set('botThumbnailFile', base64.toString());
          dispatch(close());
        }
      };
    });
  };

  return (<>
    <div className='cropperTitle'>
      <p>프로필 사진 편집</p>
    </div>
    <div className='cropperBlock'>
      <Cropper
        src={src}
        // Cropper.js options
        // initialAspectRatio={16 / 9}
        initialAspectRatio={1}
        aspectRatio={1}
        guides={false}
        background={false}
        movable={false}
        dragMode={'none'}
        zoomable={false}
        viewMode={1}
        ref={cropperRef}
    />
    </div>
    <div className='cropperBtn'>
      <button className='btn btnCancel' onClick={handleClose}>닫기</button>
      <button className='btn btnOk' onClick={handleOK}>확인</button>
    </div>
  </>);
};

export default ImageCropper;
