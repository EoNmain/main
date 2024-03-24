import React from 'react';
import { useParams } from 'react-router-dom'; // useParams 훅 import
import Layout from '../../layout/Layout';
import PostDetail from '../../components/Board/PostDetail';

export default function BoardPage() {
  const { postId } = useParams(); // URL 파라미터에서 postId 추출

  return (
    <Layout>
      <PostDetail postId={postId} />{' '}
      {/* 추출한 postId를 PostDetail에 prop으로 전달 */}
    </Layout>
  );
}
