import React from "react";
import Layout from "../layout/Layout";
import SearchButton from "../components/SearchButton";
import Hotposts from "../components/Hotposts";

function Home() {
  return (
    <div className=" flex flex-col h-screen">
      <Layout>
        <Hotposts />
        <SearchButton />
      </Layout>
    </div>
  );
}

export default Home;
