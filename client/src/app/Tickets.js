import React from 'react';
import {Link} from 'react-router-dom';
import './Tickets.css';
import Strings from 'locale/Strings';
import {useFetch} from 'graphql/useFetch';
import {queryTickets} from 'graphql/queryTickets';
import Error from './Error';

const Tickets = () => {
  const {performances, error} = useFetch(queryTickets);
  if (!performances) {
    return <Error error={error} className="m-3" />;
  }
  return (
    <div className="tickets">
      <h2>{Strings.tickets}</h2>
      <table>
        <thead>
          <tr>
            <th>{Strings.date}</th>
            <th>{Strings.time}</th>
            <th>{Strings.tickets}</th>
            <th>{Strings.stage}</th>
          </tr>
        </thead>
        <tbody>
          {performances.map((performance) => {
            const {id, date, time, show = {}, stage = {}} = performance;
            return (
              <tr key={id}>
                <td>
                  <Link to={'/tickets/' + id} style={{color: '#9b0000'}}>
                    {Strings.getDate(date)}
                  </Link>
                </td>
                <td>
                  <Link to={'/tickets/' + id} style={{color: '#9b0000'}}>
                    {Strings.getTime(date + ' ' + time)}
                  </Link>
                </td>
                <td>
                  <Link to={'/shows/' + show.id}>{show.title}</Link>
                </td>
                <td>{stage.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tickets;
