import React from 'react';
import {Form} from 'react-bootstrap';

const onChange = (handleChange) => (event) => handleChange(event.target.value);

const FormField = ({type, label, value, disabled, handleChange}) => (
  <div key={type + label}>
    <Form.Group controlId={label}>
      <Form.Label> {label}</Form.Label>
      <Form.Control type={type} defaultValue={value} disabled={disabled} onChange={onChange(handleChange)} />
    </Form.Group>
  </div>
);

export default FormField;
