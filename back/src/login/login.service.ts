
import { Injectable } from '@nestjs/common';
import { Login } from './entities/login.entity';
import { LoginsDto } from './dto/logins.dto';

@Injectable()
export class LoginService {
    private logins:Array<Login> = [];
     
    login(uid:number, loginDto:LoginsDto){
        this.logins.push({
            uid: uid,
            ...loginDto
        });
    }
}