import React from 'react';
import Header from './Header';
import Footer from './Footer';


function Layout({ children }) {
  return (
    <div className='bg-backDark'>
      <Header />
      {children}
  
      
      <Footer />
    </div>
  );
}

export default Layout;