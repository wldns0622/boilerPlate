import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

// SpecificComponent : 목적지
// option : { null : 누구나 접근가능, true: 로그인한사람 : false 로그인안한사람} 만이 접근이 가능한지
// adminRoute : 관리자인지 아닌지
export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    // redux 사용
    const dispatch = useDispatch();

    useEffect(() => {
      // auth라는 액션객체를 호출하여 reducer에게 전달함
      dispatch(auth()).then((response) => {
        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          // 만약 페이지에 로그인한사람만 갈수 있다면
          if (option) {
            // 로그인 페이지로 이동
            return props.history.push('/login');
          }
        }
        // 로그인 한 상태
        else {
          // 만약 관리자만 들어갈수 있는 페이지인데 어드민이 아닐때 못들어가게 막음
          if (adminRoute && !response.payload.isAdmin) {
            return props.history.push('/');
          } else {
            // 만약 로그인 안한사람만 접근가능한 페이지 라면
            if (option === false) {
              // 홈 페이지로 이동
              return props.history.push('/');
            }
          }
        }
      });
    }, []);
    // 위에서 해당사항이 없을때 이동하려던 컴포넌트로 이동
    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
