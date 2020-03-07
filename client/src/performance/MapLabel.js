import React from 'react';
import './MapLabel.css';
import Position from 'utils/Position';
import Strings from 'locale/Strings';

const MapLabel = ({left, top, rotate, label, row, html}) => (
  <Position left={left} top={top} rotate={rotate}>
    {label ? (
      <div className="map-label">{Strings[label] || label}</div>
    ) : row ? (
      <div className="map-label-row">{row}</div>
    ) : html ? (
      <div dangerouslySetInnerHTML={{__html: html}} />
    ) : (
      ''
    )}
  </Position>
);

export default MapLabel;
