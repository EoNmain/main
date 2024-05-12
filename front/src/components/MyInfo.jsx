import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Myinfo() {
  const [userData, setUserData] = useState({
    name: '',
    sid: '',
    period: '',
    role: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const url = 'http://localhost:3000/user/1';
        const response = await axios.get(url);
        setUserData(response.data || {});
      } catch (error) {
        console.error('Fetching data failed', error);
      }
    }

    fetchData();
  }, []);

  const userInfoFields = [
    { label: '이름', key: 'name' },
    { label: '학번', key: 'sid' },
    { label: '기수', key: 'period' },
    { label: '역할', key: 'role' },
    { label: '전화번호', key: 'phone' },
    { label: '이메일', key: 'email' }
  ];

  const handleEditClick = (fieldKey) => {
    // 각 필드 수정 버튼 클릭 시 동작하는 로직 추가
    alert(`${fieldKey} 수정 버튼이 눌렸습니다.`);
  };

  return (
    <div className="bg-backDark text-button" style={{ padding: '20px', margin: '10px', borderRadius: '10px' }}>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-white-900">내 정보</h3>
      </div>
      <div className="mt-6 border-t border-hori">
        <dl className="divide-y divide-hori">
          {userInfoFields.map(field => (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0" key={field.key} style={{ display: 'flex', alignItems: 'center' }}>
              <dt className="text-sm font-medium leading-6 text-hover" style={{ flex: 1 }}>{field.label}</dt>
              <dd className="mt-1 text-sm leading-6 text-semiTitle sm:col-span-2 sm:mt-0" style={{ flex: 2 }}>
                {userData[field.key] || '정보 없음'}
              </dd>
              <button
                onClick={() => handleEditClick(field.key)}
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginLeft: '10px'
                }}
              >
                수정
              </button>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
