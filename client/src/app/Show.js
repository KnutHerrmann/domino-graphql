import React from 'react';
import {Link, useParams} from 'react-router-dom';
import Strings from 'locale/Strings';
import {useFetch} from 'graphql/useFetch';
import {queryShow} from 'graphql/queryShow';
import Error from 'app/Error';

const Show = () => {
  const {showId} = useParams();
  const {show, error} = useFetch(queryShow, {showId});
  if (!show) {
    return <Error error={error} />;
  }
  const {performances = [], title, subtitle, description} = show;
  return (
    <div>
      <h2>{title}</h2>
      <div>{subtitle}</div>
      <br />
      {performances.map((performance) => {
        const {id, date, time, stage = {}} = performance;
        return (
          <Link to={'/tickets/' + id} key={id} style={{color: '#9b0000'}}>
            <div>{Strings.getDateTime(date + ' ' + time) + ' ... ' + stage.name}</div>
          </Link>
        );
      })}
      <br />
      <div dangerouslySetInnerHTML={{__html: description}} />
    </div>
  );
};

export default Show;
