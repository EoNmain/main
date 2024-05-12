import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({ children, className }) {
  return (
    <div className={`bg-backDark ${className}`}>
      <Header />
      {/* 새로운 컨테이너, 여기서부터 relative 적용 */}
      <div className="relative">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
