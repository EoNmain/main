/* ScrollToTopButton.js */
import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false); // 스크롤 중 여부를 나타내는 상태 변수 추가

  // Scroll 이벤트 감지하여 버튼의 표시 여부 결정
  const handleScroll = () => {
    if (!isScrolling && window.scrollY >= 200) { // 스크롤 중이 아니고 스크롤이 200px 이상인 경우에만 버튼 표시
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 페이지가 로드될 때 한 번만 실행
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 페이지 최상단으로 스크롤
  const scrollToTop = () => {
    setIsScrolling(true); // 스크롤 중임을 나타내는 상태 변수 설정
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // 부드러운 스크롤 완료 후 스크롤 중 상태를 해제
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000); // 부드러운 스크롤이 완료될 시간(1초) 설정
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%', // 원 모양으로 변경
        backgroundColor: '#121212', // 배경 색상 변경
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        /* border: '2px solid black', // 테두리 추가 */
        zIndex: '1',
      }}
      className={`scrollToTopButton ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      {/* 버튼 내부에 윗화살표 모양 */}
      <span
        style={{
          fontSize: '35px', // 아이콘 크기 조정
          color: '#FFFFFF', // 화살표 색상 변경
          lineHeight: '40px', // 화살표를 버튼의 중앙에 위치시키기 위한 조정
          position: 'absolute', // 화살표의 위치를 조정하기 위해 절대 위치 지정
          top: '45%', // 화살표를 버튼의 중앙에 위치시키기 위한 조정
          left: '50%', // 화살표를 버튼의 중앙에 위치시키기 위한 조정
          transform: 'translate(-50%, -50%)', // 화살표를 버튼의 중앙에 위치시키기 위한 조정
        }}
      >
        &uarr;
      </span>
    </div>
  );
};

export default ScrollToTopButton;
