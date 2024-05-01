//Footer.js
import React from 'react';
import ScrollToTopButton from '../components/ScrollToTopButton';
//import IconLoad from '../components/IconLoad';

const Footer = ({ ratio1, ratio2, ratio3 }) => {
  return (
    <footer
      style={{
        background: '#222222',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        flexDirection: 'column', // 모든 내용을 컬럼 방향으로 쌓음
      }}
    >
      <div style={{ flex: 1, lineHeight: '1.5', alignSelf: 'stretch' , padding: '0 500px'}}>
        <div>
          <h1 style={{ fontSize: '100%' }}>Eon Website</h1>
          <div style={{ height: '10px' }}></div>
          <p style={{ fontSize: '75%' }}>수원캠퍼스 | (16227) 경기도 수원시 영통구 광교산로 154-42</p>
          <p style={{ fontSize: '70%' }}>031-249-9114</p>
          <div style={{ height: '10px' }}></div>
          <p style={{ fontSize: '75%' }}>서울캠퍼스(03746) 서울특별시 서대문구 경기대로 9길 24</p>
          <p style={{ fontSize: '70%' }}>02-390-5114</p>
        </div>
        <hr style={{ borderTop: '1.5px solid #ccc', margin: '15px auto' }} />
        {/* 게시판 버튼을 주소 정보 바로 아래에 배치 */}
        <a href="/boardlist" style={{ color: 'white', textDecoration: 'none', fontSize: '125%', margin: '10px 0' }}>
          전체 게시판
        </a>
      </div>

      <ScrollToTopButton />
      <div style={{ height: '400px' }}></div>
    </footer>
  );
};

export default Footer;
