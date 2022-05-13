import { useSelector } from 'react-redux';
import React from 'react';

const PcAddOnComponent = () => {
  const modal = useSelector((state) => state.modal);
  const ModalComp = modal ? modal.modalComponent : null;

  return (<>
    {ModalComp && <ModalComp {...modal.modalProps} />}
  </>);
};

export default PcAddOnComponent;
