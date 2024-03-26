import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>
  ) { }
  async createComment(dto: CreateCommentDto): Promise<Comment> {
    const comment = this.repository.create({
      ...dto,
      //Post ID 를 불러와야됨. Param으로?
    });
    await this.repository.save(comment);
    return comment;
  }
  // create(createCommentDto: CreateCommentDto) {
  //   this.comments.push({
  //     cid: ++this.cid,
  //     ...createCommentDto,
  //     createdDate: new Date(),
  //   });
  // }
  async findAllComments(): Promise<Comment[]> {
    return this.repository.find();
  }
  // findAll() {
  //   return [...this.comments];
  // }

  async findWriter(writer: string): Promise<Comment[]> {
    const comments = await this.repository.find({
      where: { writer: Like(`%${writer}%`) },
    });
    return comments;
  }
  async findCommentId(cid: number): Promise<Comment> {
    const comments = await this.repository.findOne({
      where: { cid },
    });
    if (!comments) {
      throw new NotFoundException('Invalid Comment ID');
    }
    return comments;
  }
  async findPostComment(pid: number): Promise<Comment[]> {
    const comments = await this.repository.find({
      where: { pid },
      // relations: ['post'],
    }); //프론트에 댓글없을때 반환안한다고 추가함.
    // if (!comments || comments.length === 0) {
    //   throw new NotFoundException('Invalid Comment ID');
    // }
    return comments;
  }
  // findOne(cid: number) {
  //   const found = this.comments.find((c) => c.cid === cid);
  //   if (!found) throw new NotFoundException();
  //   return found;
  // }
  async updateComment(cid: number, dto: UpdateCommentDto): Promise<Comment> {
    const comments = await this.findCommentId(cid);
    this.repository.merge(comments, dto);
    comments.editDate = new Date();
    await this.repository.save(comments);
    return comments;
  }

  async removeComment(cid: number) {
    await this.repository.delete(cid);
  }
  // update(cid: number, updateCommentDto: UpdateCommentDto) {
  //   const found = this.findOne(cid);
  //   this.remove(cid);
  //   this.comments.push({ ...found, ...updateCommentDto, editDate: new Date() });
  // }

  // remove(cid: number) {
  //   this.findOne(cid);
  //   this.comments = this.comments.filter((c) => c.cid !== cid);
  // }
}
