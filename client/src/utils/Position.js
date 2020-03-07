import React from 'react';
import PropTypes from 'prop-types';

const Position = ({left = 0, top = 0, rotate = 0, children}) => {
  const style = {
    position: 'absolute',
    left: left + 'px',
    top: top + 'px',
  };
  if (rotate !== 0) {
    style.transform = 'rotate(' + rotate + 'deg)';
  }
  return <div style={style}>{children}</div>;
};

Position.propTypes = {
  top: PropTypes.number,
  left: PropTypes.number,
  rotate: PropTypes.number,
};

export default Position;
