import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role, User } from './entities/user.entity';
import { Auth } from 'src/common/decorator/auth.decorator';
import { UserIncludeReq } from 'src/common/decorator/user.decorator';
import { CodeDto } from './dto/code.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto);
  }

  @Post('oauth/github')
  signin(@Body() codeDto: CodeDto) {
    return this.userService.oauthGithub(codeDto);
  }

  @Auth()
  @Get(':id')
  getMyInfo(@Param('id') id: number) {
    return this.userService.getMyInfo(id);
  }

  @Put()
  @Auth()
  signout(@UserIncludeReq() user: User) {
    return this.userService.signout(user);
  }

  @Delete()
  @Auth()
  withdrawal(@UserIncludeReq() user: User) {
    return this.userService.withdrawal(user);
  }

  @Auth([Role.Admin])
  @Get()
  getUsers(@Param('id') id: number) {
    return this.userService.getMyInfo(id);
  }
}
