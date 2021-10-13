import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
function authCheck(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then(response => {
        
        //로그인 하지않은 상태
        if(!response.payload.isAuth) {
          if(option) {
            props.history.push('/login');
          }
        } else {
          if(adminRoute && !response.payload.isAuth) {
            props.history.push('/');
          } else {
            if(option === false) {
              props.history.push('/');
            }
          }
        }

      })
    })

    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}

export default authCheck;