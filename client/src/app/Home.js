import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import Spinner from 'utils/Spinner';
import Strings from 'locale/Strings';
import {useFetch} from 'graphql/useFetch';
import {queryHome} from 'graphql/queryHome';
import Error from './Error';

const Home = () => {
  const {performances, error} = useFetch(queryHome);
  return (
    <div className="home">
      <h2>{Strings.welcome}</h2>
      {error ? (
        <Error error={error} className="mr-3" />
      ) : !performances ? (
        <Spinner />
      ) : (
        performances.map((performance = {}, index) => {
          if (index >= 3) {
            return null;
          }
          const {id, date, time, show = {}, stage = {}} = performance;
          return (
            <div
              className="home-performance"
              style={{
                marginLeft: index * 40 + 'px',
                width: 'calc(100% - ' + 3 * 40 + 'px)',
              }}
              key={id}
            >
              <Link to={'/tickets/' + id} style={{color: '#9b0000'}}>
                {Strings.formatString(
                  Strings.welcomePerformanceDateTime,
                  Strings.getWeekday(date),
                  Strings.getDate(date),
                  Strings.getTime(date + ' ' + time)
                )}
              </Link>
              <Link to={'/shows/' + show.id}>
                <h3>{show.title}</h3>
              </Link>
              <div>{show.subtitle}</div>
              <div>{stage.name}</div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;
