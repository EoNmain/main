import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly repository: Repository<Post>
  ) {}

  async createPost(dto: CreatePostDto): Promise<Post> {
    const post = this.repository.create({
      ...dto,
      recommand: 0,
      check: 0,
      createdDate: new Date(),
    });
    await this.repository.save(post);
    return post;
  }

  async findAllPosts(): Promise<Post[]> {
    return this.repository.find();
  }

  async findPostById(pid: number): Promise<Post> {
    const post = await this.repository.findOne({ where: { pid } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async updatePost(pid: number, dto: UpdatePostDto): Promise<Post> {
    const post = await this.findPostById(pid);
    this.repository.merge(post, dto);
    post.editDate = new Date();
    await this.repository.save(post);
    return post;
  }

  async deletePost(pid: number): Promise<void> {
    await this.repository.delete(pid);
  }

  async search(uid: number): Promise<Post[]>{
    const posts = await this.repository.find({ where: { uid } });
    if (!posts) {
      throw new NotFoundException('Post not found');
    }
    return posts;
  }

  async findTitle(title: string): Promise<Post[]>{
    const posts = await this.repository.find({ where: { title: Like(`%${title}%`) } });
    return posts;
  }

  async findWriter(writer: string): Promise<Post[]>{
    const posts = await this.repository.find({ where: { writer: Like(`%${writer}%`) } });
    if (!posts) {
      throw new NotFoundException('Post not found');
    }
    return posts;
  }

  async findContent(content: string): Promise<Post[]>{
    const posts = await this.repository.find({ where: { content: Like(`%${content}%`) } });
    if (!posts) {
      throw new NotFoundException('Post not found');
    }
    return posts;
  }
}
