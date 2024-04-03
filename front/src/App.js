import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignInPage from './page/SignInPage';
import SignUpPage from './page/SignUpPage';
import Home from './page/Home';
import BoardList from './page/boardlist/BoardList';
import MyPage from './page/MyPage';
import PasswdPage from './page/PasswdPage';
import Write from './page/boardlist/Write';
import BoardPage from './page/boardlist/BoardPage'; // 이 부분의 임포트가 올바른지 확인하세요
import Gallery from './page/boardlist/Gallery';
import SearchPage from './page/SearchPage';
import SignUp from './components/SignUp';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boardlist" element={<BoardList />} />
        <Route path="/Signin" element={<SignInPage />} />
        <Route path="/github-login" element={<SignUp />} />
        <Route path="/Signup" element={<SignUpPage />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/signin/findpasswd" element={<PasswdPage />} />
        <Route path="/boardlist/write" element={<Write />} />
        <Route path="/boardlist/board/:postId" element={<BoardPage />} />
        <Route path="/boardlist/gallery" element={<Gallery />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
