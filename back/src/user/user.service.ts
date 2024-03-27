import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Token } from './entities/token.entity';
import { TokenBlacklist } from './entities/tokenBlacklist.entity';
import { CryptoManager } from 'src/crypto/provider/crypto-manager';
import { CommonException } from 'src/common/filter/common.exception';
import { TokenCreator } from 'src/auth/provider/token-creator';
import { ConfigService } from '@nestjs/config';
import { EnvKey } from 'src/common/env.validator';
import { CodeDto } from './dto/code.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
    private readonly cryptoManager: CryptoManager,
    private readonly tokenCreator: TokenCreator,
    @Inject(User)
    private readonly userRepository: Repository<User>,
    @Inject(Token)
    private readonly tokenRepository: Repository<Token>,
    @Inject(TokenBlacklist)
    private readonly tokenBlacklistRepository: Repository<TokenBlacklist>,
    private readonly configService: ConfigService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    // const res2 = await fetch('https://api.github.com/user/emails', {
    //   method: 'post',
    //   headers: {
    //     Authorization: 'Bearer' + codes.access_token,
    //     Accept: 'application/json',
    //   },
    // });
    // if (res2.status !== 200) {
    //   throw new CommonException('AUTH', 'GITHUB_OAUTH_FAILED');
    // }
    // const email: string = res2.json()[0].email;
    // const didEncryptEmail = await this.cryptoManager.encrypt(email);
    const didEncryptEmail = await this.cryptoManager.encrypt(
      createUserDto.email,
    );
    const didEncryptName = await this.cryptoManager.encrypt(createUserDto.name);
    const didEncryptPhone = await this.cryptoManager.encrypt(
      createUserDto.phone,
    );
    const didEncryptSid = await this.cryptoManager.encrypt(createUserDto.sid);
    const didEncryptPeriod = await this.cryptoManager.encrypt(
      createUserDto.period,
    );

    const user = await this.userRepository.findOne({
      where: {
        email: didEncryptEmail,
        phone: didEncryptPhone,
        sid: didEncryptSid,
      },
    });

    if (user) {
      throw new CommonException('USER', 'ALREADY_USER', '이미 가입된 유저');
    }

    const didCreateUser = await this.userRepository.save({
      email: didEncryptEmail,
      name: didEncryptName,
      phone: didEncryptPhone,
      sid: didEncryptSid,
      period: didEncryptPeriod,
    });
    didCreateUser.email = createUserDto.email;
    didCreateUser.name = createUserDto.name;
    didCreateUser.phone = createUserDto.phone;
    didCreateUser.sid = createUserDto.sid;
    didCreateUser.period = createUserDto.period;

    return didCreateUser;
  }

  async signin(email: string) {
    const didEncryptEmail = await this.cryptoManager.encrypt(email);

    const user = await this.userRepository.findOne({
      where: {
        email: didEncryptEmail,
      },
      relations: ['token'],
    });
    if (!user) {
      throw new CommonException(
        'USER',
        'NOT_FOUND_USER',
        '유저를 찾을 수 없습니다.',
      );
    }

    const accessToken = this.tokenCreator.createAccessToken(user);
    const refreshToken = this.tokenCreator.createRefreshToken(user);

    const didEncryptAccessToken = await this.cryptoManager.encrypt(accessToken);
    const didEncryptRefreshToken =
      await this.cryptoManager.encrypt(refreshToken);

    if (user.token) {
      await this.tokenBlacklistRepository.insert({
        token: user.token.accessToken,
      });
      await this.tokenBlacklistRepository.insert({
        token: user.token.refreshToken,
      });

      await this.tokenRepository.delete(user.token.id);
    }

    await this.tokenRepository.save({
      accessToken: didEncryptAccessToken,
      refreshToken: didEncryptRefreshToken,
      user,
    });

    user.email = email;

    return {
      isUser: true,
      ...user,
      token: {
        accessToken,
        refreshToken,
      },
    };
  }

  getMyInfo(id: number) {
    return `This action returns a #${id} user`;
  }

  async signout(user: User) {
    const temp = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
      relations: ['token'],
    });

    if (temp.token) {
      await this.tokenBlacklistRepository.insert({
        token: temp.token.accessToken,
      });
      await this.tokenBlacklistRepository.insert({
        token: temp.token.refreshToken,
      });

      await this.tokenRepository.delete(temp.token.id);
    }
    // return user;
  }

  async oauthGithub(codeDto: CodeDto) {
    const body = {
      client_id: this.configService.get(EnvKey.GITHUB_CLIENT_ID),
      client_secret: this.configService.get(EnvKey.GITHUB_SECRETS),
      code: codeDto.code,
    };
    console.log(JSON.stringify(body));
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (res.status !== 200) {
      throw new CommonException('AUTH', 'GITHUB_OAUTH_FAILED_ACODE');
    }
    const codes = await res.json();
    const res2 = await fetch('https://api.github.com/user/emails', {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + (await codes.access_token),
        Accept: 'application/json',
      },
    });

    const json2 = await res2.json();
    const didEncryptEmail = await this.cryptoManager.encrypt(json2[0].email);
    const user = await this.userRepository.findOne({
      where: {
        email: didEncryptEmail,
      },
      relations: ['token'],
    });
    if (!user) {
      return { isUser: false, user: { code: codes } };
    } else {
      this.signin(json2[0].email);
    }

    return codeDto;
  }

  async withdrawal(user: User) {
    await this.signout(user);
    await this.userRepository.softRemove(user);
  }
}
