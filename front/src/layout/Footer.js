import React from 'react';
import ScrollToTopButton from '../components/ScrollToTopButton';
import IconLoad from '../components/IconLoad';

const Footer = ({ ratio1, ratio2, ratio3 }) => {
  return (
    <footer style={{ background: '#222222', display: 'flex', justifyContent: 'center', textAlign: 'center', color: 'white' }}>
      <div style={{ flex: ratio1, lineHeight: '1.5' }}>
        <div>
          <div style={{ height: '10px' }}></div>
          <h1 style={{ fontSize: '150%' }}>Eon Website</h1>
          <div style={{ height: '20px' }}></div>
          <p></p>
          <div style={{ height: '10px' }}></div>
          <p>수원캠퍼스  |  (16227) 경기도 수원시 영통구 광교산로 154-42</p>
          <p>031-249-9114</p>
          <p>서울캠퍼스(03746) 서울특별시 서대문구 경기대로 9길 24</p>
          <p>02-390-5114</p>
        </div>
        <hr style={{ borderTop: '1.5px solid #ccc', margin: '15px auto' }} />
      </div>
      
      <div style={{ flex: ratio3, lineHeight: '3' }}>
        <div style={{ height: '10px' }}></div>
        <p></p>
      </div>

      <div style={{ flex: ratio2, lineHeight: '3' }}>
        <div style={{ height: '10px' }}></div>
        <a href="/boardlist" style={{ color: 'white', textDecoration: 'none' }}>전체게시판</a><br />
      </div>

      <div style={{ flex: ratio3, lineHeight: '3' }}>
        <div style={{ height: '10px' }}></div>
        <a href="https://github.com" style={{ color: 'white', textDecoration: 'none' }}>모집해요</a>
      </div>
      <div style={{ flex: ratio3, lineHeight: '2' }}>
        <div style={{ height: '10px' }}></div>
        <h3 style={{ fontSize: '150%' }}>SNS</h3>
        <p></p>
        <IconLoad/>
      </div>
      <ScrollToTopButton/>
      <div style={{ height: '400px' }}></div> 
    </footer>
  );
};

export default Footer;
