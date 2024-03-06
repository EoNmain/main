import {React} from 'react';
// 빨간색 원형 버튼 컴포넌트
export default function Floatcircle(props) {
    // 버튼 클릭 시 실행할 함수
    const handleClick = () => {
      // 더 큰 원을 표시하거나 숨기는 로직
      props.toggleBigCircle();
    };
  
    return (
      <div
        className="red-button"
        style={{
          position: "fixed", // 화면에 고정
          bottom: "20px", // 하단에서 20px 떨어뜨림
          right: "20px", // 우측에서 20px 떨어뜨림
          width: "15px", // 너비 15px로 변경
          height: "15px", // 높이 15px로 변경
          borderRadius: "50%", // 원형 모양
          backgroundColor: "red", // 빨간색 배경
          display: "flex", // flex 디스플레이
          justifyContent: "center", // 수평 중앙 정렬
          alignItems: "center", // 수직 중앙 정렬
          cursor: "pointer", // 커서 모양
          zIndex: "1", // 다른 요소들 위에 렌더링
        }}
        onClick={handleClick} // 클릭 이벤트 핸들러
      >
        {/* 버튼 내부에 + 모양 */}
        <span
          style={{
            fontSize: "10px", // 폰트 크기 5px로 변경
            color: "white", // 흰색 글자
          }}
        >
          +
        </span>
      </div>
    );
  }
  
  // 더 큰 원 컴포넌트
  function BigCircle(props) {
    // 각 섹션의 이름과 색상
    const sections = [
      { name: "사진 게시판", color: "pink" },
      { name: "소개 게시판", color: "orange" },
      { name: "질문 게시판", color: "yellow" },
      { name: "모집 게시판", color: "green" },
    ];
  
    // 각 섹션을 JSX로 변환
    const sectionElements = sections.map((section, index) => {
      // 각 섹션의 각도 (0, 90, 180, 270도)
      const angle = index * 90;
  
      // 각 섹션의 스타일
      const sectionStyle = {
        width: "20px", // 너비 20px로 변경
        height: "20px", // 높이 20px로 변경
        backgroundColor: section.color, // 배경색
        transform: `rotate(${angle}deg) skew(45deg)`, // 회전하고 기울임
        display: "flex", // flex 디스플레이
        justifyContent: "center", // 수평 중앙 정렬
        alignItems: "center", // 수직 중앙 정렬
      };
  
      // 각 섹션의 이름 스타일
      const nameStyle = {
        transform: `skew(-45deg) rotate(-${angle}deg)`, // 반대로 기울이고 회전하여 원래대로 복구
        fontSize: "8px", // 폰트 크기 8px로 변경
        fontWeight: "bold", // 굵은 글자
      };
  
      return (
        // 각 섹션의 JSX
        <div key={index} style={sectionStyle}>
          {/* 각 섹션의 이름 JSX */}
          <span style={nameStyle}>{section.name}</span>
        </div>
      );
    });
  
    return (
      // 더 큰 원의 JSX
      <div
        className="big-circle"
        style={{
          position: "fixed", // 화면에 고정
          bottom: "20px", // 하단에서 20px 떨어뜨림
          right: "20px", // 우측에서 20px 떨어뜨림
          width: "20px", // 너비 20px로 변경
          height: "20px", // 높이 20px로 변경
          borderRadius: "50%", // 원형 모양
          display: props.show ? "flex" : "none", // show가 true면 flex, false면 none
          flexWrap: "wrap", // flex 아이템들을 줄바꿈
          zIndex: "0", // 다른 요소들 아래에 렌더링
        }}
      >
        {/* 각 섹션의 JSX들 */}
        {sectionElements}
      </div>
    );
  }
  
  // 앱 컴포넌트
  function State() {
    // 더 큰 원을 표시할지 여부를 관리하는 상태
    const [showBigCircle, setShowBigCircle] = React.useState(false);
  
    // 더 큰 원을 표시하거나 숨기는 함수
    const toggleBigCircle = () => {
      setShowBigCircle((prev) => !prev);
    };
  
    return (
      // 앱의 JSX
      <div className="state">
        {/* 빨간색 원형 버튼 컴포넌트 */}
        <Floatcircle toggleBigCircle={toggleBigCircle} />
        {/* 더 큰 원 컴포넌트 */}
        <BigCircle show={showBigCircle} />
      </div>
    );
  }
  
  