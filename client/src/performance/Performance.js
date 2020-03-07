import React, {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useParams, useHistory} from 'react-router-dom';
import SeatMap from './SeatMap';
import SelectedSeats from './SelectedSeats';
import Prices from './Prices';
import Spinner from 'utils/Spinner';
import Strings from 'locale/Strings';
import {useFetch} from 'graphql/useFetch';
import {queryPerformance} from 'graphql/queryPerformance';
import {mutationBuyTickets} from 'graphql/mutationBuyTickets';
import Error from 'app/Error';
import {fetchData, createPayload} from 'graphql/fetchData';

const Performance = ({user = {}}) => {
  const {performanceId} = useParams();
  const {performance, error} = useFetch(queryPerformance, {performanceId});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [errorBuyingTickets, setErrorBuyingTickets] = useState('');
  const history = useHistory();
  if (!performance) {
    return error ? <Error error={error} /> : <Spinner />;
  }
  const buyTickets = async ({total}) => {
    const {id, password} = user;
    const seats = selectedSeats.map((seat) => seat.seat);
    const {buyTickets, error} = await fetchData(
      createPayload(mutationBuyTickets, {
        id,
        password,
        input: {performanceId, seats, total},
      })
    );
    setErrorBuyingTickets(error || '');
    if (buyTickets) {
      setTimeout(() => (window.location = '#/order/' + buyTickets.id), 500); // give time to refresh view - DQL issue?
    }
  };
  const {tickets, show, stage, date, time, price1, price2, price3} = performance;
  const bookedseats = {};
  tickets &&
    tickets.forEach((ticket) => {
      const {order = {}} = ticket;
      const {customer = {}} = order;
      bookedseats[ticket.seat] =
        customer && customer.zipcode === user.zipcode && customer.id !== user.id ? customer : true;
    });
  const prices = {1: price1 / 100, 2: price2 / 100, 3: price3 / 100};
  const seatClick = (seat) => {
    if (!user.id) {
      history.push('/login?redirect=' + history.location.pathname);
    }
    const selectedSeatsNew = selectedSeats.filter((selectedSeat) => selectedSeat.seat !== seat);
    if (selectedSeats.length === selectedSeatsNew.length) {
      const {seats} = stage;
      const category = seats[seat][3];
      const price = prices[category];
      selectedSeatsNew.push({seat, category, price});
    }
    setSelectedSeats(selectedSeatsNew);
  };
  return (
    <Container fluid={true}>
      <Row>
        <Col xs={12} md={7}>
          <div>
            <SeatMap
              performanceId={performanceId}
              stage={stage}
              bookedSeats={bookedseats}
              selectedSeats={selectedSeats}
              seatClick={seatClick}
              prices={prices}
            />
            <Prices prices={prices} />
          </div>
        </Col>
        <Col xs={12} md={5}>
          <h2>{Strings.tickets}</h2>
          <h4>{show.title}</h4>
          <h4>{Strings.getDateTime(date + ' ' + time) + ' ... ' + stage.name}</h4>
          {selectedSeats.length > 0 ? (
            <>
              <SelectedSeats selectedSeats={selectedSeats} seatClick={seatClick} buyTickets={buyTickets}>
                <Error error={errorBuyingTickets} />
              </SelectedSeats>
            </>
          ) : (
            <p>
              <br />
              <br />
              {Strings.select}
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Performance;
