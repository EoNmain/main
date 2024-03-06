/*app.js*/
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignInPage from './page/SignInPage';
import SignUpPage from './page/SignUpPage';
import Home from './page/Home';
import BoardList from './page/boardlist/BoardList';
import MyPage from './page/MyPage';
import PasswdPage from './page/PasswdPage';
import Write from './page/boardlist/Write';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boardlist" element={<BoardList />} />
        <Route path="/Signin" element={<SignInPage />} />
        <Route path="/Signup" element={<SignUpPage />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/signin/findpasswd" element={<PasswdPage />} />
        <Route path="/boardlist/write" element={<Write />} />
      </Routes>
      
    </div>
  );
}

export default App;
