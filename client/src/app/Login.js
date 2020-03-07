import React, {useState} from 'react';
import './Form.css';
import LoginUserData from './LoginUserData';
import LoginUser from './LoginUser';
import {Button} from 'react-bootstrap';
import Strings from 'locale/Strings';

export const ACTION_CREATE_CUSTOMER = 'createCustomer';
export const ACTION_EDIT_CUSTOMER = 'editCustomer';
export const ACTION_UPDATE_CUSTOMER = 'updateCustomer';
export const ACTION_CHANGE_PASSWORD = 'changePassword';

const Login = ({user = {}, setUser}) => {
  const [action, setAction] = useState('');
  if (user.id || action) {
    return <LoginUserData user={user} setUser={setUser} action={action} setAction={setAction} />;
  }
  return (
    <LoginUser setUser={setUser}>
      <Button variant="secondary" onClick={() => setAction(ACTION_CREATE_CUSTOMER)}>
        {Strings[ACTION_CREATE_CUSTOMER]}
      </Button>
    </LoginUser>
  );
};

export default Login;
