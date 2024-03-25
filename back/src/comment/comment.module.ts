import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { typeORMConfigPost } from 'src/configs/typeorm.config';
import { CommentRepository } from './comment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forRoot(typeORMConfigPost),
  ],
  exports: [TypeOrmModule, CommentRepository],
  providers: [CommentService, CommentRepository],
  controllers: [CommentController],
})
export class CommentModule { }
