import React, { useState, useEffect } from 'react';
import Layout from '../../layout/Layout';
import Autopic from '../../components/Board/Autopic';
import Galleryport from '../../components/Board/Galleryport';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]); // 갤러리 아이템을 위한 상태

  useEffect(() => {
    async function fetchGalleryItems() {
      try {
        const response = await axios.get('http://localhost:3000/post', {
          params: { type: 'gallery' },
        });
        setGalleryItems(response.data.data); // 데이터 설정
      } catch (error) {
        console.error('갤러리 데이터를 불러오는데 실패했습니다.', error);
      }
    }
    fetchGalleryItems();
  }, []);

  return (
    <Layout>
      <Autopic />
      <div className="my-12" />
      <div className="flex flex-wrap justify-around">
        {galleryItems.map((item) => (
          <div key={item.id} className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-1">
            <Galleryport GpostId={item.id} {...item} />
          </div>
        ))}
      </div>
      <Link
        to="/boardlist/write"
        className="absolute bottom-10 right-10 bg-skyblue text-white font-semibold py-2 px-4 rounded shadow"
        style={{ textDecoration: 'none' }}
      >
        글 작성 <span aria-hidden="true">&rarr;</span>
      </Link>
    </Layout>
  );
}
