export const containerStyle = (idx) => ({
  pointerEvents: 'auto',
  top: `${(54 * idx) - 2}px`,
  paddingTop: '1px',
  left: 0,
  right: 0,
  height: '1px',
  position: 'fixed',
  zIndex: '999999',
});

export const div1Style = {
  marginTop: '17px',
  maxWidth: '670px',
  minWidth: '320px',
  margin: '17px auto 10px',
  width: '90%',
};

export const toastDomStyle = (color) => ({
  backgroundColor: color,
  margin: '0 auto 10px',
  padding: '10px 34px 10px 50px',
  boxShadow: '0 0 5px rgb(0 0 0 / 45%)',
  opacity: '1',
  color: '#fff',
  fontSize: '15px',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '3px',
  cursor: 'pointer',
  maxWidth: 'none !important',
  minWidth: '0 !important',
  width: 'auto !important',
});

export const closeBtnStyle = {
  position: 'absolute',
  top: '14px',
  right: '13px',
  fontSize: '12px',
};

export const typeIconStyle = {
  position: 'absolute',
  top: '11px',
  left: '18px',
  fontSize: '20px',
};
