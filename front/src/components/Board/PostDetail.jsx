import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const PostDetail = ({ postId, onClose }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/post/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('게시글을 불러오는 데 실패했습니다.', error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) return null;

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{post.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{post.content}</p>
        <p className="text-muted">작성자: {post.writer}</p>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onClose} className="btn btn-secondary">
          닫기
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostDetail;
