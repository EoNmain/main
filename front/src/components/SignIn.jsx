//Signin.jsx
import React from 'react';
import Gitcat from '../assets/Gitcat.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  // const [userStatus, setUserStatus] = useState(null);
  // const navigate = useNavigate();

  // const getCodeFromUrl = () => {
  //   const search = window.location.search;
  //   const params = new URLSearchParams(search);
  //   return params.get('code');
  // }; //여기까지 ok

  // const sendCodeToBackend = async (code) => {
  //   try {
  //     const url = 'http://localhost:3000/user/oauth/github';
  //     const response = await axios.post(url,
  //     {
  //       code,
  //     });
      
  //     if (response.data.result === 'FAIL') {
  //       // 여기서 에러를 처리합니다. 예를 들어 사용자에게 에러 메시지를 표시하거나 로그인 페이지로 리다이렉션할 수 있습니다.
  //       console.error('Authentication failed:', response.data.error);
  //       // 에러 메시지를 상태에 저장하거나, 상황에 맞는 추가 액션을 취합니다.
  //       // 예: setUserStatus({ error: response.data.error });
  //     } else {
  //       setUserStatus(response.data); // 성공적인 응답 데이터를 상태에 저장합니다.
  //       if (response.data.isUser === false) {
  //         navigate('/signup'); // 새 사용자인 경우, /signup 페이지로 이동합니다.
  //       } else {
  //         // 기존 사용자일 경우의 처리를 추가합니다.
  //         // 예: navigate('/dashboard'); // 또는 로그인 상태를 전역 상태 관리에 반영
  //         navigate('/home');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error sending code to backend:', error);
  //     // 네트워크 에러나 기타 예외 처리를 할 수 있는 코드를 추가합니다.
  //     // 예: setUserStatus({ error: 'Network error or other exception occurred.' });
  //   }
  // };

  // // 사용자 상태나 에러를 UI에 반영하는 로직
  // const renderUserStatus = () => {
  //   // 상태에 에러가 있는 경우 에러 메시지를 표시
  //   if (userStatus?.error) {
  //     return <div className="error">Error: {userStatus.error}</div>;
  //   }

  //   // 로딩 상태 표시
  //   if (!userStatus) {
  //     return <div>Loading...</div>;
  //   }

  //   // 사용자 인증 결과에 따라 메시지 표시
  //   if (userStatus.isUser === true) {
  //     return <div>Welcome back, user!</div>;
  //   } else if (userStatus.isUser === false) {
  //     return <div>Welcome, new user!</div>;
  //   } else {
  //     return <div>Unable to determine user status.</div>;
  //   }
  // };


  // useEffect(() => {
  //   const code = getCodeFromUrl();
  //   if (code) {
  //     sendCodeToBackend(code);
  //   }
  // }, [navigate]);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-backDark">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-semiTitle">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-semiTitle"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></input>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-semiTitle"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="/signin/findpasswd"
                  className="font-semibold text-semiTitle hover:text-hover"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-hover sm:text-sm sm:leading-6"
              ></input>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-button px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-Bhover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          <span style={{ fontSize: '20px' }}>SignUp to Github</span>
          <a
            href="https://github.com/login/oauth/authorize?client_id=06310df2aadaef6f793a&scope=read%3Auser%20user%3Aemail
            "
            style={{ display: 'block', margin: 'auto', width: 'fit-content' }}
          >
            <img
              src={Gitcat}
              alt=""
              style={{
                display: 'inline',
                verticalAlign: 'middle',
                width: '100px',
              }}
            />
          </a>
        </p>
      </div>
      {/* {renderUserStatus()} */} {/* 여기 수정함 ㅅㅂ*/ }
    </div>
  );
}
export default SignIn;
