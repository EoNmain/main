// PostDetail.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostDetail = ({ postId }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/post/${postId}`
        );
        setPost(response.data.data);
      } catch (error) {
        console.error('게시글을 불러오는 데 실패했습니다.', error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p className="text-muted">작성자: {post.writer}</p>
      <p className="text-muted">글 내용: {post.content}</p>
      {/* 필요한 경우 여기에 더 많은 게시글 정보를 추가합니다. */}
    </div>
  );
};

export default PostDetail;
