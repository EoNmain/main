// PostDetail.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const PostDetail = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); //댓글 상태 추가

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/post/${postId}`
        );
        setPost(response.data.data);

        const commentResponse = await axios.get(
          `http://localhost:3000/comment?pid=${postId}`
        );
        setComments(commentResponse.data.data);
      } catch (error) {
        console.error("게시글을 불러오는 데 실패했습니다.", error);
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

      {/* 댓글 리스트 렌더링 */}

      <h2 style={{color:'whitesmoke'}}>댓글</h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.cid} style={{color:'white'}}>
              <p style={{color:"white"}}>{comment.content}</p>
              <p className="text-muted">작성자: {comment.writer}</p>
              {/* 필요하다면 여기에 더 많은 댓글 정보를 추가합니다. */}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{color:"white"}}>댓글이 없습니다.</p>
      )}
    </div>
  );
};

export default PostDetail;
