import React, { useState } from 'react';
import likeImage from '../assets/LikeButton.png';  // 좋아요 이미지
import unlikeImage from '../assets/UnLikeButton.png';  // 좋아요 취소 이미지

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [likedByUser, setLikedByUser] = useState(false);

  const handleLike = () => {
    if (likedByUser) {
      setLikes(likes - 1);
      setLikedByUser(false);
    } else {
      setLikes(likes + 1);
      setLikedByUser(true);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* 이미지를 상태에 따라 변경하여 'Like' 버튼을 구현합니다. */}
      <img 
        src={likedByUser ? likeImage : unlikeImage} // 상태에 따라 다른 이미지를 사용
        alt={likedByUser ? 'Unlike' : 'Like'}
        style={{ cursor: 'pointer', width: '50px', height: '50px' }} // 이미지 스타일 지정
        onClick={handleLike}
      />
      <span style={{ marginLeft: '5px', fontSize: '18px' }}>{likes}</span>
    </div>
  );
};

export default LikeButton;
