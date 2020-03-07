import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import FormField from 'app/FormField';
import Strings from 'locale/Strings';
import {fetchData, createPayload} from 'graphql/fetchData';
import {queryLogin} from 'graphql/queryLogin';
import './Form.css';
import {useHistory} from 'react-router-dom';
import Error from './Error';

const LoginUser = ({setUser, children}) => {
  const [customerId, setCustomerId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const login = async () => {
    const {customer} = await fetchData(createPayload(queryLogin, {id: customerId, password}));
    if (customer) {
      setUser({...customer, password});
      if (history.location.search) {
        history.goBack(); // login was successful - go back to performance to select seats
      }
    } else {
      setError(Strings.loginFailed);
    }
  };
  const removeError = () => setError('');
  return (
    <Form className="form" onFocus={removeError}>
      <FormField type="email" label={Strings.customerId} handleChange={setCustomerId} />
      <FormField type="password" label={Strings.password} handleChange={setPassword} />
      <Error error={error} />
      <Button onClick={login}>{Strings.login}</Button>
      {children}
    </Form>
  );
};

export default LoginUser;
