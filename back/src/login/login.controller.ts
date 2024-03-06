import { Body, Controller, Param, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginsDto } from './dto/logins.dto';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) { }

    @Post(':uid')
    logins(@Param('uid') uid: number, loginDto: LoginsDto) {
        return this.loginService.login(uid, loginDto);
    }
}

