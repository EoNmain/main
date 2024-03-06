로그인 페이지나 회원가입 페이지는 단일 페이지로 만들어야할듯
헤더에 절대 바뀌지 않는 react-router-dom 사용해서 버튼만 구현하고 링크 부여하고
그거랑 별개로 검색했을 때 검색 내용도 별도의 페이지로 구성을 해야함.
아마 js 문법 open.window()로 새로운 창 여는건 비추일듯? 아마 생각좀 해보고 결정하기

게시글 만들 때, 게시글 작성 페이지 만들어야됨. 아마 추가 링크로 만들어야할듯
그리고 게시글 조회 페이지도 만들어야함

페이지를 만드는데, Layout readme 파일 보면 바디 부분만 children prop으로 넘긴다고 한 것처럼 만들어야함.
그렇게 하면 코드가 깔끔해진다.///

헤더와 푸터가 있는 page를 만들 때 예시

function Abc(){
return(
<Layout>
~~~~~바디 부분 쓸 내용
<Layout />
)
}

이건데 아마 파일만들때는 위에 먼저 함수로 바디에 넣을거 정의하고
밑에 function AbcPage() ~ 이렇게 윗 함수처럼 적으면 될 것 같다.

이온 로고 넣는 방법( 이건 예시임 ):

import Eonlogo from '../assets/Eonlogo.png';

        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src={Eonlogo} alt="" />
          </a>
        </div>
