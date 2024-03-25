import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Post } from 'src/post/entities/post.entity';

// @Injectable()
// export class CommentService {
//   private comments: Array<Comment> = [];
//   private cid = 0;

//   create(createCommentDto: CreateCommentDto) {
//     this.comments.push({
//       cid: ++this.cid,
//       ...createCommentDto,
//       createdDate: new Date(),
//     });
//   }
//   findAll() {
//     return [...this.comments];
//   }

//   findOne(cid: number) {
//     const found = this.comments.find((c) => c.cid === cid);
//     if (!found) throw new NotFoundException();
//     return found;
//   }

//   update(cid: number, updateCommentDto: UpdateCommentDto) {
//     const found = this.findOne(cid);
//     this.remove(cid);
//     this.comments.push({ ...found, ...updateCommentDto, editDate: new Date() });
//   }

//   remove(cid: number) {
//     this.findOne(cid);
//     this.comments = this.comments.filter((c) => c.cid !== cid);
//   }
// }
@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

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

  async findPostComment(pid:number): Promise<Comment[]> {
    return this.commentRepository.findPostComment(+pid);
  }
}