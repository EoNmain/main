import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(dto: CreatePostDto): Promise<post> {
    return this.postRepository.createPost(dto);
  }

  async search(uid: number): Promise<post[]> {
    return this.postRepository.search(uid);
  }

  async findTitle(title: string): Promise<post[]> {
    return this.postRepository.findTitle(title);
  }

  async findWriter(writer: string): Promise<post[]> {
    return this.postRepository.findWriter(writer);
  }

  async findContent(content: string): Promise<post[]> {
    return this.postRepository.findContent(content);
  }

  async findOne(pid: number): Promise<post> {
    return this.postRepository.findPostById(pid);
  }

  async findAll(): Promise<post[]> {
    return this.postRepository.findAllPosts();
  }

  async update(pid: number, dto: UpdatePostDto): Promise<post> {
    return this.postRepository.updatePost(pid, dto);
  }

  async remove(pid: number): Promise<void> {
    return this.postRepository.deletePost(pid);
  }
  async paginate(page: number = 1): Promise<any>{
    return this.postRepository.paginate(page)
  }
}
