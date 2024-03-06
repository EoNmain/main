import React, { useState } from 'react';
import './Hotposts.css'; // 스타일링을 위한 CSS 파일을 import

export default function Hotposts() {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabHover = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="hotposts-container">
      <div className="tabs-buttons-container"> {/* 변경된 클래스 이름 */}
        <button
          className={`tab-button ${activeTab === 'Tab1' ? 'active' : ''}`}
          onMouseEnter={() => handleTabHover('Tab1')}
        >
          오늘의 이온
        </button>
        <button
          className={`tab-button ${activeTab === 'Tab2' ? 'active' : ''}`}
          onMouseEnter={() => handleTabHover('Tab2')}
        >
          중요 공지
        </button>
        <button
          className={`tab-button ${activeTab === 'Tab3' ? 'active' : ''}`}
          onMouseEnter={() => handleTabHover('Tab3')}
        >
          모집중
        </button>
      </div>
      <div className="tabs-content-container">
        <div className="tab-content">
          {activeTab === 'Tab1' && <div>
            조회수가 높은 게시글, 혹은 좋아요나 댓글이 많은 게시글로 기준을 하나 정해서
            전체 게시판의 모든 글들의 데이터를 DB에서 가져와
            내림차순으로 10개 까지 나열
            </div>}
          {activeTab === 'Tab2' && <div>
           (미정) 서버시간 기준으로 현재 봐야하는 공지들 나열
            </div>}
          {activeTab === 'Tab3' && <div>
            서버시간 기준으로 현재 모집중인 스터디팟, 공모전팟 등 나열
            </div>}
        </div>
      </div>
    </div>
  );
};
