import React, { useState } from "react";
import {SearchIcon} from '@heroicons/react';
import "../output.css";

export default function SearchButton() {
  // 검색어 상태 관리
  const [query, setQuery] = useState("");

  // 검색어 입력 이벤트 핸들러
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // 검색 버튼 클릭 이벤트 핸들러
  const handleClick = () => {
    // 여기에 검색 로직을 작성하세요
    alert(`검색어: ${query}`);
  };

  return (
    <div className="pt-24 bg-backDark">
      <div style={{ height: '500px' }}></div>
      <div
        className="search-bar relative w-96"
        style={{ width: "400px", margin: "0 auto" }}
      >
        {/* <SearchIcon className="h-6 w-6 inline-block mr-2" /> */}
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="검색어를 입력하세요"
          className="w-72 h-10 px-4 border border-gray-300 rounded-full outline-none"
        />
        <button
          onClick={handleClick}
          className="w-20 h-10 ml-4 border-none rounded-full bg-blue-500 text-white font-bold cursor-pointer"
        >
          검색
        </button>
      </div>
      <div style={{ height: '500px' }}></div>
    </div>
  );
}
