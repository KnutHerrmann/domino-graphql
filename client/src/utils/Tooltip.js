import React, {useRef} from 'react';
import {OverlayTrigger, Popover} from 'react-bootstrap';
import PropTypes from 'prop-types';

const Tooltip = ({title, tooltip, placement = 'top', children}) => {
  let refOverlayTrigger = useRef(null);
  const hidePopover = () => refOverlayTrigger.handleHide();
  const popoverTop = (
    <Popover id="popover">
      <Popover.Title as="h3">{title}</Popover.Title>
      <Popover.Content>{tooltip}</Popover.Content>
    </Popover>
  );
  return (
    <OverlayTrigger
      ref={(ref) => (refOverlayTrigger = ref)}
      placement={placement}
      trigger="hover"
      overlay={popoverTop}
      delay={500}
    >
      <div onMouseDown={hidePopover} onWheel={hidePopover}>
        {children}
      </div>
    </OverlayTrigger>
  );
};

Tooltip.propTypes = {
  title: PropTypes.string,
  tooltip: PropTypes.object,
  placement: PropTypes.string,
};

export default Tooltip;
