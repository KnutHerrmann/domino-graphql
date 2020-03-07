import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import Strings from 'locale/Strings';
import FormField from './FormField';
import Error from './Error';
import {ACTION_CHANGE_PASSWORD, ACTION_CREATE_CUSTOMER, ACTION_EDIT_CUSTOMER, ACTION_UPDATE_CUSTOMER} from './Login';
import {mutationChangePassword} from 'graphql/mutationChangePassword';
import {fetchData, createPayload} from 'graphql/fetchData';
import {mutationCreateCustomer} from 'graphql/mutationCreateCustomer';
import {mutationUpdateCustomer} from 'graphql/mutationUpdateCustomer';

const executeChangePassword = async ({id, currentPassword, newPassword, repeatPassword}) => {
  if (newPassword !== repeatPassword) {
    return {error: 'Repeated password is not equal to new password'};
  }
  const {changePassword, error = ''} = await fetchData(
    createPayload(mutationChangePassword, {
      id,
      password: currentPassword,
      newPassword,
    })
  );
  if (!changePassword) {
    return {error: 'Could not change password. ' + error};
  }
  return {newPassword};
};

const executeCreateCustomer = async ({id, password, repeatPassword, input}) => {
  if (password !== repeatPassword) {
    return {error: 'Repeated password is not equal to password'};
  }
  const {createCustomer, error = ''} = await fetchData(createPayload(mutationCreateCustomer, {id, password, input}));
  if (!createCustomer) {
    return {error: 'Could not save customer data. ' + error};
  }
  return {customer: createCustomer};
};

const executeUpdateCustomer = async ({id, password, input}) => {
  const {updateCustomer, error = ''} = await fetchData(createPayload(mutationUpdateCustomer, {id, password, input}));
  if (!updateCustomer) {
    return {error: 'Could not update customer data. ' + error};
  }
  return {customer: updateCustomer};
};

const LoginUserData = ({user = {}, setUser, action, setAction}) => {
  const [firstname, setFirstname] = useState(user['firstname']);
  const [lastname, setLastname] = useState(user['lastname']);
  const [id, setId] = useState(user['id']);
  const [password, setPassword] = useState(user['password']);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [phone, setPhone] = useState(user['phone']);
  const [zipcode, setZipcode] = useState(user['zipcode']);
  const [city, setCity] = useState(user['city']);
  const [error, setError] = useState('');
  const logout = () => setUser({});
  const removeError = () => setError('');
  const executeEditCustomer = () => setAction(ACTION_UPDATE_CUSTOMER);
  const executeAction = async () => {
    let result = {};
    if (action === ACTION_CHANGE_PASSWORD) {
      result = await executeChangePassword({id, currentPassword, newPassword, repeatPassword});
    } else {
      const input = {lastname, firstname, phone, zipcode, city};
      if (action === ACTION_CREATE_CUSTOMER) {
        result = await executeCreateCustomer({id, password, repeatPassword, input});
      } else if (action === ACTION_UPDATE_CUSTOMER) {
        result = await executeUpdateCustomer({id, password, input});
      }
    }
    if (result.error) {
      setError(result.error);
    } else {
      if (result.customer) {
        setUser({...result.customer, password});
      } else if (result.newPassword) {
        setUser({...user, password: result.newPassword});
      }
      setAction('');
    }
  };
  const cancel = () => setAction('');
  const disabled = !action;
  return (
    <Form className="form" onFocus={removeError}>
      {action === ACTION_CHANGE_PASSWORD ? (
        <>
          <FormField type="password" label={Strings.currentPassword} handleChange={setCurrentPassword} />
          <FormField type="password" label={Strings.newPassword} handleChange={setNewPassword} />
          <FormField type="password" label={Strings.repeatPassword} handleChange={setRepeatPassword} />
        </>
      ) : (
        <>
          <FormField type="email" label={Strings.customerId} value={id} disabled={disabled} handleChange={setId} />
          {action === 'createCustomer' && (
            <>
              <FormField type="password" label={Strings.password} handleChange={setPassword} />
              <FormField type="password" label={Strings.repeatPassword} handleChange={setRepeatPassword} />
            </>
          )}
          <FormField label={Strings.firstname} value={firstname} disabled={disabled} handleChange={setFirstname} />
          <FormField label={Strings.lastname} value={lastname} disabled={disabled} handleChange={setLastname} />
          <FormField label={Strings.phone} value={phone} disabled={disabled} handleChange={setPhone} />
          <FormField label={Strings.zipcode} value={zipcode} disabled={disabled} handleChange={setZipcode} />
          <FormField label={Strings.city} value={city} disabled={disabled} handleChange={setCity} />
        </>
      )}
      <Error error={error} />
      {(action === ACTION_CREATE_CUSTOMER ||
        action === ACTION_UPDATE_CUSTOMER ||
        action === ACTION_CHANGE_PASSWORD) && (
        <>
          <Button onClick={executeAction}>{Strings.ok}</Button>
          <Button variant="secondary" onClick={cancel}>
            {Strings.cancel}
          </Button>
        </>
      )}
      {action === '' && (
        <>
          <Button onClick={logout}>{Strings.logout}</Button>
          <Button variant="secondary" onClick={executeEditCustomer}>
            {Strings[ACTION_EDIT_CUSTOMER]}
          </Button>
          <Button variant="secondary" onClick={() => setAction(ACTION_CHANGE_PASSWORD)}>
            {Strings[ACTION_CHANGE_PASSWORD]}
          </Button>
        </>
      )}
    </Form>
  );
};

export default LoginUserData;
