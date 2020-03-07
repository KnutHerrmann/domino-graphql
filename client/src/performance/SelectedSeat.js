import React from 'react';
import './Seat.css';
import './SelectedSeat.css';
import Strings from 'locale/Strings';
import PropTypes from 'prop-types';
import {getSeatProps} from 'utils/getSeatProps';

const SelectedSeat = ({seat, category, price, seatClick}) => {
  const {section, annotation, row, seatno} = getSeatProps(seat);
  return (
    <div className="selected-seat">
      <div className="selected-seat-section">{section + ' - ' + annotation}</div>
      <div className="selected-seat-number">
        {Strings.row} <b>{row}</b> {Strings.seat} <b>{seatno}</b>
      </div>
      <div className="selected-seat-price">{Strings.getCurrency(price)}</div>
      <div className={'selected-seat-category seat-category-' + category} onClick={() => seatClick(seat)}>
        {'X'}
      </div>
    </div>
  );
};

SelectedSeat.propTypes = {
  seat: PropTypes.string.isRequired,
  category: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  seatClick: PropTypes.func.isRequired,
};

export default SelectedSeat;
