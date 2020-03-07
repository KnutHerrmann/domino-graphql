import React from 'react';
import {Link, Route} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import Show from './Show';
import Strings from 'locale/Strings';
import {useFetch} from 'graphql/useFetch';
import {queryShows} from 'graphql/queryShows';
import Error from './Error';

const Shows = ({match}) => {
  const {shows, error} = useFetch(queryShows);
  if (!shows) {
    return <Error error={error} className="m-3" />;
  }
  if (match.isExact) {
    window.location = '#/shows/' + shows[0].id;
  }
  return (
    <div className="home">
      <h2>{Strings.listOfShows}</h2>
      <Container fluid={true}>
        <Row>
          <Col xs={12} md={2}>
            <br />
            {shows.map((show) => (
              <div key={show.id}>
                <Link to={'/shows/' + show.id}>
                  <h3>{show.title}</h3>
                </Link>
              </div>
            ))}
          </Col>
          <Col xs={12} md={10}>
            <Route path="/shows/:showId" component={Show} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Shows;
