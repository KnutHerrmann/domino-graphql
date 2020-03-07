import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {useFetch} from 'graphql/useFetch';
import {queryOrder} from 'graphql/queryOrder';
import {getSeatProps} from 'utils/getSeatProps';
import Strings from 'locale/Strings';
import Error from './Error';

const Order = () => {
  const {orderId} = useParams();
  const {order, error} = useFetch(queryOrder, {orderId});
  if (!orderId) {
    return null;
  }
  if (!order) {
    return <Error error={error} />;
  }
  const {orderdatetime, total, tickets = []} = order;
  const {performance} = tickets[0];
  const {date, time, show, stage} = performance;
  const {title, id} = show;
  return (
    <div>
      <h2>Thank you for your order</h2>#{orderId} - {Strings.getDateTime(orderdatetime)}
      <br />
      <br />
      <br />
      <h4>
        <Link to={'/shows/' + id}>{title}</Link>
      </h4>
      <h4>
        <Link to={'/tickets/' + performance.id}>{Strings.getDateTime(date + ' ' + time) + ' ... ' + stage.name}</Link>
      </h4>
      {tickets.map((ticket) => {
        const {seat} = ticket;
        const {section, annotation, row, seatno} = getSeatProps(seat);
        return (
          <div key={seat}>
            {section} - {annotation}&nbsp;&nbsp;&nbsp;&nbsp;{Strings.row} <b>{row}</b> {Strings.seat} <b>{seatno}</b>
          </div>
        );
      })}
      <br />
      <h4>
        <span>{Strings.total}</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <b>{Strings.getCurrency(total / 100)}</b>
      </h4>
    </div>
  );
};

export default Order;
