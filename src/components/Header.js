import React, { useState } from 'react';
import './Header.css';

function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const noticeText = "공지사항입니다. 이 공지사항은 매우 긴 내용을 포함하고 있습니다. 예를 들어, 오늘의 특별 메뉴, 영업시간 변경, 이벤트 안내 등 다양한 내용이 포함될 수 있습니다. 이렇게 긴 내용은 기본적으로는 일부만 보이고, 더보기를 클릭하면 전체 내용을 확인할 수 있습니다.";

  const toggleNotice = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <header className="header">
      <div className="header-top">
        <span className="store-name">상호명</span>
        <span className="table-number">자리 (포스기 번호)</span>
        <span className="notice-icon">📝</span>
      </div>
      <div className={`notice-box ${isExpanded ? 'expanded' : ''}`} onClick={toggleNotice}>
        <span className="notice-title">{noticeText}</span>
        <button className="notice-toggle">
          {isExpanded ? '▲' : '▼'}
        </button>
      </div>
    </header>
  );
}

export default Header; 