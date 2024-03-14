import React from "react";
import Layout from '../layout/Layout';

export default function BoardListLayout() {
  return (
    <Layout>
    <div className="bg-backDark py-10 sm:py-10 text-align: center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-align: center">
        <div className="mx-auto max-w-2xl lg:mx-0 text-align: center">
          <h2
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ textAlign: "center" }}
          >
            검색 결과
            
          </h2>
          <p
            className="mt-2 text-lg leading-8 text-gray-600"
            style={{ textAlign: "center" }}
          ></p>
        </div>
        <hr />

      </div>
    </div>
    </Layout>
  );
}
