import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
    providers: [CommentService],
    controllers: [CommentController]
})
export class CommentModule { }
