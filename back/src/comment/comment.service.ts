import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) { }

  async createComment(dto: CreateCommentDto): Promise<Comment> {
    return this.commentRepository.createComment(dto);
  }

  async findAllComments(): Promise<Comment[]> {
    return this.commentRepository.findAllComments();
  }

  async findWriter(writer: string): Promise<Comment[]> {
    return this.commentRepository.findWriter(writer);
  }

  async findCommentId(cid: number): Promise<Comment> {
    return this.commentRepository.findCommentId(cid);
  }

  async updateComment(cid: number, dto: UpdateCommentDto): Promise<Comment> {
    return this.commentRepository.updateComment(cid, dto);
  }

  async removeComment(cid: number) {
    return this.commentRepository.removeComment(cid);
  }

  async findPostComment(pid: number): Promise<Comment[]> {
    return this.commentRepository.findPostComment(+pid);
  }
}