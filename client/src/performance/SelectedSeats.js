import React from 'react';
import {Button} from 'react-bootstrap';
import './SelectedSeats.css';
import SelectedSeat from './SelectedSeat';
import Strings from 'locale/Strings';
import PropTypes from 'prop-types';

const SelectedSeats = ({selectedSeats, seatClick, buyTickets, children}) => {
  if (selectedSeats.length === 0) {
    return null;
  }
  let total = 0;
  const seatList = selectedSeats.map((selectedSeat) => {
    const {seat, category, price} = selectedSeat;
    total += price;
    return <SelectedSeat key={seat} seat={seat} category={category} price={price} seatClick={seatClick} />;
  });
  const buy = () => buyTickets({total: Math.round(total * 100)});
  return (
    <>
      <div className="selected-seats">
        {seatList}
        <div className="selected-seats-total">
          <div className="selected-seats-total-label">{Strings.total}</div>
          <div className="selected-seats-total-price">{Strings.getCurrency(total)}</div>
        </div>
      </div>
      {children}
      <div style={{marginTop: '20px'}}>
        <Button onClick={buy}>{Strings.buy}</Button>
      </div>
    </>
  );
};

SelectedSeats.propTypes = {
  selectedSeats: PropTypes.array.isRequired,
  seatClick: PropTypes.func.isRequired,
  buyTickets: PropTypes.func.isRequired,
};
export default SelectedSeats;
