import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router';

function LoginPage(props) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('Email', email);
    console.log('Password', password);

    const body = { email, password };
    console.log(body);

    dispatch(loginUser(body))
    .then(response => {
      if(response.payload.loginSuccess) {
        props.history.push('/');
      } else {
        alert('Error'); 
      }
    })
    
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
      <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler}/>
        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler}/>
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);