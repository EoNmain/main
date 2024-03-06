import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { ConfigModule } from '@nestjs/config';
=======
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';

import { LikeService } from './like/like.service';
import { LikeController } from './like/like.controller';
import { LikeModule } from './like/like.module';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';
import { CommentController } from './comment/comment.controller';
import { ReplyService } from './reply/reply.service';
import { ReplyController } from './reply/reply.controller';
import { ReplyModule } from './reply/reply.module';
import { AdminService } from './admin/admin.service';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
>>>>>>> 1e9b779001ba7c02d926a83e62bc84f8e08c200e
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CryptoModule } from './crypto/crypto.module';

import { validate } from './common/env.validator';

import * as path from 'path';
import { DatabaseModule } from './common/database/database.module';
import { CryptoCliModule } from './crypto/crypto-cli.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';


/*@Module({
  imports: [PostModule, LikeModule, CommentModule, ReplyModule, AdminModule],
  controllers: [AppController, LikeController, CommentController, ReplyController, AdminController],
  providers: [AppService, LikeService, CommentService, ReplyService, AdminService],*/


@Module({
  imports: [
<<<<<<< HEAD
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: path.resolve(__dirname, '../.env'),
    }),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'client'),
    }),
    UserModule,
    AuthModule,
    CryptoModule,
    CryptoCliModule,
  ],
  controllers: [],
  providers: [],
=======
      TypeOrmModule.forRoot(typeORMConfigPost),
      TypeOrmModule.forRoot(typeORMConfigUser),
      PostModule,
      UserModule, LikeModule, CommentModule, ReplyModule, AdminModule
  ],
  controllers: [AppController, LikeController, CommentController, ReplyController, AdminController],
  providers: [AppService, LikeService, CommentService, ReplyService, AdminService],
>>>>>>> 1e9b779001ba7c02d926a83e62bc84f8e08c200e
})
export class AppModule {}
