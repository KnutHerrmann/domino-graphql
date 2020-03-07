import React from 'react';
import './SeatMap.css';
import ScaleToWidthAndZoom from 'utils/ScaleToWidthAndZoom';
import Seat from './Seat';
import MapLabel from './MapLabel';
import PropTypes from 'prop-types';

const SeatMap = ({bookedSeats, stage, prices, selectedSeats, seatClick}) => {
  const {width, height, zoomstart, zoommin, zoommax, seats, rows, labels, htmls} = stage;
  return (
    <div className="seat-map">
      <ScaleToWidthAndZoom width={width} height={height} zoomStart={zoomstart} zoomMin={zoommin} zoomMax={zoommax}>
        {htmls.map((html, index) => (
          <MapLabel key={index} left={html[0]} top={html[1]} rotate={html[2]} html={html[3]} />
        ))}
        {labels.map((label, index) => (
          <MapLabel key={index} left={label[0]} top={label[1]} rotate={label[2]} label={label[3]} />
        ))}
        {rows.map((row, index) => (
          <MapLabel key={index} left={row[0]} top={row[1]} rotate={row[2]} row={row[3]} />
        ))}
        {Object.keys(seats).map((seat) => {
          const seatDef = seats[seat];
          const bookedSeat = bookedSeats[seat];
          const category = bookedSeat ? 0 : seatDef[3];
          const price = prices[category];
          return (
            <Seat
              key={seat}
              left={seatDef[0]}
              top={seatDef[1]}
              rotate={seatDef[2]}
              seat={seat}
              category={category}
              price={price}
              selected={selectedSeats.filter((selectedSeat) => selectedSeat.seat === seat).length > 0}
              seatClick={seatClick}
              bookedSeat={bookedSeat}
            />
          );
        })}
      </ScaleToWidthAndZoom>
    </div>
  );
};

SeatMap.propTypes = {
  stage: PropTypes.object.isRequired,
  selectedSeats: PropTypes.array.isRequired,
  seatClick: PropTypes.func.isRequired,
};

export default SeatMap;
