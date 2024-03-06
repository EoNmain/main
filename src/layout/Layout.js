import React from 'react';
import Header from './Header';
import Footer from './Footer';


function Layout({ children }) {
  return (
    <div class='bg-backDark'>
      <Header />
      {children}
  
      
      <Footer />
    </div>
  );
}

export default Layout;