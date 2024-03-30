//Signin.jsx
import React from 'react';
import Gitcat from '../assets/Gitcat.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [userStatus, setUserStatus] = useState(null);
  const navigate = useNavigate();

  const getCodeFromUrl = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    return params.get('code');
  };

  const sendCodeToBackend = async (code) => {
    try {
      const response = await axios.post('http://localhost:3000/user/oauth', {
        code,
      });
      setUserStatus(response.data);
      if (response.data.isUser === 'false') {
        navigate('/signup'); // 새 사용자인 경우, /signup 페이지로 이동
      }
    } catch (error) {
      console.error('Error sending code to backend:', error);
    }
  };

  const renderUserStatus = () => {
    if (!userStatus) {
      return <div>Loading...</div>;
    }

    if (userStatus.isUser === 'true') {
      // 기존 사용자에 대한 처리
      return <div>Welcome back, user!</div>;
    } else if (userStatus.isUser === 'false') {
      // 새로운 사용자에 대한 처리
      return <div>Welcome, new user!</div>;
    } else {
      // 예상치 못한 상태에 대한 처리
      return <div>Unable to determine user status.</div>;
    }
  };

  useEffect(() => {
    const code = getCodeFromUrl();
    if (code) {
      sendCodeToBackend(code);
    }
  }, [navigate]);

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-backDark">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-semiTitle">
          Sign in to your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-semiTitle"
            >
              Email address
            </label>
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></input>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-semiTitle"
              >
                Password
              </label>
              <div class="text-sm">
                <a
                  href="/signin/findpasswd"
                  class="font-semibold text-semiTitle hover:text-hover"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-hover sm:text-sm sm:leading-6"
              ></input>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-button px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-Bhover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
      {renderUserStatus()}
    </div>
  );
}
export default SignIn;
