//Gallery.jsx
import React from 'react';
import Layout from '../../layout/Layout';
import Autopic from '../../components/Board/Autopic';
import Galleryport from '../../components/Board/Galleryport';

export default function Gallery() {
  return (
    <Layout>
      <Autopic />
      <div className="my-12" />{' '}
      {/* margin-top and margin-bottom: 3rem (48px) */}
      <div className="flex flex-wrap justify-around">
        {/* sm: 너비 640px 이상에서 한 줄에 3개, md: 너비 768px 이상에서 한 줄에 4개, lg: 너비 1024px 이상에서 한 줄에 5개 */}
        <div className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-1">
          <Galleryport />
        </div>
        <div className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-1">
          <Galleryport />
        </div>
        <div classNazme="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-1">
          <Galleryport />
        </div>
        {/* 더 많은 GalleryPort 컴포넌트를 추가할 수 있습니다. */}
      </div>
    </Layout>
  );
}
