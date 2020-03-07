import React from 'react';
import {Alert} from 'react-bootstrap';

const Error = ({error, className}) =>
  error ? (
    <Alert variant="danger" className={className}>
      {error}
    </Alert>
  ) : null;

export default Error;
