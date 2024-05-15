import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { post } from './entities/post.entity';
import { PostRepository } from './post.repository';
import { typeORMConfigPost } from 'src/configs/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([post]),
    TypeOrmModule.forRoot(typeORMConfigPost),
  ],
  exports: [TypeOrmModule, PostRepository],
  providers: [PostService, PostRepository],
  controllers: [PostController],
})
export class PostModule { }
