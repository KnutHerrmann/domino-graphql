import React from 'react';
import './Seat.css';
import Position from 'utils/Position';
import Tooltip from 'utils/Tooltip';
import Strings from 'locale/Strings';
import PropTypes from 'prop-types';
import {getSeatProps} from 'utils/getSeatProps';

const Seat = ({left, top, rotate, seat, category, price, selected, seatClick, bookedSeat}) => {
  const {section, annotation, row, seatno} = getSeatProps(seat);
  const tooltip = (
    <div>
      {section + ' - ' + annotation}
      <br />
      {Strings.row + ': ' + row}
      <br />
      {Strings.seat + ': ' + seatno}
      <br />
      {category !== 0 ? (
        Strings.price + ': ' + Strings.getCurrency(price)
      ) : bookedSeat && bookedSeat.zipcode ? (
        <div style={{color: 'green'}}>
          <b>Booked by:</b>
          <div>{bookedSeat.id}</div>
          <div>{bookedSeat.phone}</div>
          <b>{'--> Ask for a lift <--'}</b>
          <div>(same zip code {bookedSeat.zipcode} as yours)</div>
        </div>
      ) : (
        Strings.sold
      )}
    </div>
  );
  return (
    <Position key={seat} left={left} top={top} rotate={rotate}>
      <Tooltip title={Strings.seatInfo} tooltip={tooltip}>
        <div
          className={
            'seat seat-category-' +
            (category === 0 && bookedSeat && bookedSeat.zipcode ? 'environment' : category) +
            (selected ? ' seat-selected' : '') +
            (category !== 0 ? ' seat-clickable' : '')
          }
          onClick={category !== 0 ? () => seatClick(seat) : undefined}
        >
          {seatno}
        </div>
      </Tooltip>
    </Position>
  );
};

Seat.propTypes = {
  seat: PropTypes.string.isRequired,
  category: PropTypes.number.isRequired,
  price: PropTypes.number,
  selected: PropTypes.bool.isRequired,
  seatClick: PropTypes.func.isRequired,
};

export default Seat;
