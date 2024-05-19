//SignUp.jsx
import { useState } from 'react';
import axios from 'axios';
import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [userStatus, setUserStatus] = useState(null);
  const navigate = useNavigate();

  const getCodeFromUrl = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    return params.get('code');
  }; //여기까지 ok
  // ---------------------------------------------------여기가 원래 코드
  const sendCodeToBackend = async (code) => {
    try {
      // IV 생성
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encodedText = new TextEncoder().encode(code);
  
      // 암호화 설정
      const key = await window.crypto.subtle.importKey(
        'raw',
        new Uint8Array(16), // 실제 환경에서는 안전한 키 관리가 필요
        { name: 'AES-GCM' },
        false,
        ['encrypt', 'decrypt']
      );
  
      // 암호화 실행
      const encryptedData = await window.crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv: iv,
        },
        key,
        encodedText
      );
  
      // 암호화된 데이터와 IV를 base64로 인코딩하여 전송 준비
      const encryptedCode = btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
      const base64IV = btoa(String.fromCharCode(...iv));
  
      // 서버로 전송할 URL과 데이터 객체 생성
      const url = 'http://localhost:3000/user/oauth/github';
      const postData = {
        code
        //iv: base64IV
      };
      //console.log(encryptedCode); 
  
      // 서버로 POST 요청
      const response = await axios.post(url, postData);
  
      console.log('Server response:', response.data);
      // 응답 처리
      if (response.data.result === 'FAIL') {
        console.error('Authentication failed:', response.data.error);
        alert(`Error: ${response.data.error.message || 'Unknown error occurred'}`); // 오류 발생 시 로그인 페이지로 리디렉트
      } else {
        setUserStatus(response.data); // 성공적인 응답 데이터를 상태에 저장
        navigate(
          response.data.isUser ? '/' : '/signup' // isUser 값에 따라 조건부 리디렉션
        );
      }
    } catch (error) {
      console.error('Error sending code to backend:', error);
      alert('Error: ' + (error.message || 'Unknown error occurred'));
      navigate('/signin'); // 오류 발생 시 로그인 페이지로 리디렉트
    }
  };
  
  

  // ------------------------------------------------------

  const [formData, setFormData] = useState({
    name: '',
    period: '',
    email: '',
    phoneNumber: '',
  });

  const [agreed, setAgreed] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (agreed) {
      try {
        // 사용자가 입력한 데이터를 포함하는 객체를 생성합니다.
        const postData = {
          name: formData.name,
          period: formData.period,
          email: formData.email,
          phone: formData.phoneNumber,
          sid: formData.period // 학번을 sid로 보내는 경우
        };
  
        // 서버로 POST 요청을 보냅니다.
        const response = await axios.post('http://localhost:3000/user/signup', postData);
  
        console.log(response.data);
        // 성공적인 응답을 받으면 메인 페이지('/home')로 네비게이션합니다.
        navigate('/home');
      } catch (error) {
        console.error('Error sending user data to backend:', error);
        alert('Error: ' + (error.response?.data?.message || 'Unknown error occurred'));
      }
    } else {
      alert('Please agree to the privacy policy.');
    }
  };
  
  useEffect(() => {
    const code = getCodeFromUrl();
    if (code) {
      sendCodeToBackend(code);
    }
  }, [navigate]); // passive 함수야

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Contact sales
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>
      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="company"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              이름
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="period"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              학번
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="period"
                id="period"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Phone number
            </label>
            <div className="relative mt-2.5">
              <div className="absolute inset-y-0 left-0 flex items-center">
                {/* <select
                  id="phone"
                  name="phone"
                  className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option>010</option>
                </select>
                <ChevronDownIcon
                  className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                /> */}
              </div>
              <input
                type="tel"
                name="phone-number"
                id="phone-number"
                autoComplete="tel"
                className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? 'bg-indigo-600' : 'bg-gray-200',
                  'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? 'translate-x-3.5' : 'translate-x-0',
                    'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our{' '}
              <a href="#" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
              .
            </Switch.Label>
          </Switch.Group>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Let's talk
          </button>
        </div>
      </form>
    </div>
  );
}
