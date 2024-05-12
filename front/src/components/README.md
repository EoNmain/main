버튼
https://heroicons.com/

signup 기능 구현 도중에 back과 연결 부족
구조가 클라이언트가 code를 서버로 주고 서버가 그 code를 깃허브에 주면 token을 반환받음.
그 token을 다시 받고 깃허브에 정보조회 가능. -> 이거는 클라이언트는 필요없음.
클라이언트는 code를 주고 반환값으로 기존사용자인지 새 사용자인지를 판별받아야함. 그 데이터가 무슨 파일에 있는지?

src/user/user.service.ts
에서
    if (!user) {
      return { isUser: false, user: { code: codes } };
    } else {
      this.signin(json2[0].email);
    }

    return codeDto;
  }
  이 부분 isUser:false
  이면 create-user.dto.ts
  export class CreateUserDto {
  name: string;
  period: string;
  sid: string;
  email: string;
  phone: string;
}
이건 LETS TALK를 누르면 그때 보내는걸로 하면 될듯? 
이거를 보내는거임

그리고 isUser가 json값으로 반환이 됨.
그래서 json 값을 읽는 기능이 필요함.


순서가 바뀐거임.코드를 보내면 RETURN으로 isuser가 나오고 그 isuser는 나에게 json으로 01을 보내줌
그럴때 나는 그걸 받아서 1이면 홈으로 리디렉션하면 되는거고 0이면 signup로 리디렉션하면 되는거임
그리고 signup에서 
  export class CreateUserDto {
  name: string;
  period: string;
  sid: string;
  email: string;
  phone: string;
}
이 양식으로 localhost:3000/signup으로 보내면 된다. 
그러고 '/' 으로 리디렉션.
