import React, {PureComponent} from 'react';
import Measure from 'react-measure';
import PropTypes from 'prop-types';

class ScaleToWidthAndZoom extends PureComponent {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    zoomStart: PropTypes.number,
    zoomMin: PropTypes.number,
    zoomMax: PropTypes.number,
  };

  state = {
    id: Math.random()
      .toString(36)
      .substr(2, 10),
    height: 0,
    scaleWidth: 1,
    previousScaleWidth: 0,
    scaleZoom: this.props.zoomStart,
    origin: {x: 0, y: 0},
    zoom: !(this.props.zoomStart === this.props.zoomMin && this.props.zoomMin === this.props.zoomMax),
  };

  handleWheel = (event) => {
    let nodeZoomer = event.target;
    while (nodeZoomer.id !== this.state.id && nodeZoomer.parentNode) {
      nodeZoomer = nodeZoomer.parentNode;
    }
    const rectZoomer = nodeZoomer.getBoundingClientRect();
    const mouseInRect = {x: event.pageX - rectZoomer.left, y: event.pageY - rectZoomer.top};
    let scaleZoom = this.state.scaleZoom - event.deltaY / (event.deltaMode === 0 ? 1000 : 100) / this.state.scaleWidth;
    if (scaleZoom < this.props.zoomMin) {
      scaleZoom = this.props.zoomMin;
    } else if (scaleZoom > this.props.zoomMax) {
      scaleZoom = this.props.zoomMax;
    }
    if (scaleZoom !== this.state.scaleZoom) {
      const origin = {
        x: mouseInRect.x - ((mouseInRect.x - this.state.origin.x) * scaleZoom) / this.state.scaleZoom,
        y: mouseInRect.y - ((mouseInRect.y - this.state.origin.y) * scaleZoom) / this.state.scaleZoom,
      };
      this.setState({...this.state, scaleZoom, origin});
    }
  };

  handleMouseDown = (event) => {
    const mouseDown = {x: event.pageX, y: event.pageY, origin: {...this.state.origin}};
    this.setState({...this.state, mouseDown});
    event.preventDefault();
  };

  handleMouseUp = (event) => {
    const mouseDown = null;
    this.setState({...this.state, mouseDown});
    event.preventDefault();
  };

  handleMouseMove = (event) => {
    if (this.state.mouseDown) {
      const origin = {
        x: this.state.mouseDown.origin.x - (this.state.mouseDown.x - event.pageX),
        y: this.state.mouseDown.origin.y - (this.state.mouseDown.y - event.pageY),
      };
      this.setState({...this.state, origin});
    }
    event.preventDefault();
  };

  onResize = ({bounds}) => {
    const scaleWidth = bounds.width / this.props.width;
    if (scaleWidth !== this.state.previousScaleWidth) {
      this.setState({
        ...this.state,
        height: this.props.height * scaleWidth,
        scaleWidth,
        previousScaleWidth: this.state.scaleWidth,
      });
    }
  };

  render() {
    const {id, origin, zoom, scaleWidth, scaleZoom, height: stateHeight} = this.state;
    const {width, height} = this.props;
    const styleTranslate = {
      width: width + 'px',
      height: height + 'px',
      transform: 'translate(' + origin.x + 'px, ' + origin.y + 'px)',
    };
    const styleScale = {
      transform: 'scale(' + scaleWidth * scaleZoom + ')',
      position: 'absolute',
    };
    return (
      <Measure bounds onResize={this.onResize}>
        {({measureRef}) => (
          <div
            ref={measureRef}
            id={id}
            style={{width: '100%', height: stateHeight + 'px', overflow: 'hidden'}}
            onWheel={zoom ? this.handleWheel : null}
            onMouseDown={zoom ? this.handleMouseDown : null}
            onMouseUp={zoom ? this.handleMouseUp : null}
            onMouseMove={zoom ? this.handleMouseMove : null}
          >
            <div style={styleTranslate}>
              <div style={styleScale}>{this.props.children}</div>
            </div>
          </div>
        )}
      </Measure>
    );
  }
}

ScaleToWidthAndZoom.defaultProps = {
  zoomStart: 1,
  zoomMin: 0.2,
  zoomMax: 5,
};

export default ScaleToWidthAndZoom;
