import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository
  ) {}

  async create(dto: CreatePostDto): Promise<Post> {
    return this.postRepository.createPost(dto);
  }

  async search(uid: number): Promise<Post[]>{
    return this.postRepository.search(uid);
  }
  
  async findTitle(title: string): Promise<Post[]>{
    return this.postRepository.findTitle(title);
  }

  async findWriter(writer: string): Promise<Post[]>{
    return this.postRepository.findWriter(writer);
  }

  async findContent(content: string): Promise<Post[]>{
    return this.postRepository.findContent(content);
  }

  async findOne(pid: number): Promise<Post> {
    return this.postRepository.findPostById(pid);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.findAllPosts();
  }

  async update(pid: number, dto: UpdatePostDto): Promise<Post> {
    return this.postRepository.updatePost(pid, dto);
  }

  async remove(pid: number): Promise<void> {
    return this.postRepository.deletePost(pid);
  }
}
