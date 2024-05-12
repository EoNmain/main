import React from "react";
import Layout from "../layout/Layout";
import SearchButton from "../components/SearchButton";
import Hotposts from "../components/Hotposts";

function Home() {
  return (
    <div className="flex flex-col h-screen">
      {/* Inline 스타일로 relative 설정 */}
      <Layout style={{ position: 'relative' }}>
        <Hotposts />
        <SearchButton />
      </Layout>
    </div>
  );
}

export default Home;
