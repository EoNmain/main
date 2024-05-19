//BoardPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom'; // useParams 훅 import
import Layout from '../../layout/Layout';
import PostDetail from '../../components/Board/PostDetail';
import GalleryPage from '../../page/boardlist/GalleryPage';
export default function BoardPage() {
  const { postId } = useParams(); // URL 파라미터에서 postId 추출
  const { GpostId } = useParams();
  // const { code } = useParams();

  return (
    <Layout>
      <PostDetail postId={postId} /> <GalleryPage GpostId={GpostId} />{' '}
      {/* <SignIn code={} */}
      {/* 추출한 postId를 PostDetail에 prop으로 전달 */}
    </Layout>
  );
}
