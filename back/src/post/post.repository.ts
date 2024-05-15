import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { skip } from 'node:test';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(post)
    private readonly repository: Repository<post>
  ) { }

  async createPost(dto: CreatePostDto): Promise<post> {
    const post = this.repository.create({
      ...dto,
      recommand: 0,
      check: 0,
      createdDate: new Date(),
    });
    await this.repository.save(post);
    return post;
  }

  async findAllPosts(): Promise<post[]> {
    return this.repository.find();
  }

  async findPostById(pid: number): Promise<post> {
    const post = await this.repository.findOne({ where: { pid } });
    if (!post) {
      throw new NotFoundException('post not found');
    }
    return post;
  }

  async updatePost(pid: number, dto: UpdatePostDto): Promise<post> {
    const post = await this.findPostById(pid);
    this.repository.merge(post, dto);
    post.editDate = new Date();
    await this.repository.save(post);
    return post;
  }

  async deletePost(pid: number): Promise<void> {
    await this.repository.delete(pid);
  }

  async search(uid: number): Promise<post[]> {
    const posts = await this.repository.find({ where: { uid } });
    if (!posts) {
      throw new NotFoundException('post not found');
    }
    return posts;
  }

  async findTitle(title: string): Promise<post[]> {
    const posts = await this.repository.find({
      where: { title: Like(`%${title}%`) },
    });
    return posts;
  }

  async findWriter(writer: string): Promise<post[]> {
    const posts = await this.repository.find({
      where: { writer: Like(`%${writer}%`) },
    });
    if (!posts) {
      throw new NotFoundException('post not found');
    }
    return posts;
  }

  async findContent(content: string): Promise<post[]> {
    const posts = await this.repository.find({
      where: { content: Like(`%${content}%`) },
    });
    if (!posts) {
      throw new NotFoundException('post not found');
    }
    return posts;
  }

  async paginate(page: number = 1): Promise<any> {
    const take = 5; //한페이지에 담기는 수
    const [posts, total] = await this.repository.findAndCount({
      take,
      skip: page <= 0 ? (page = 0) : (page - 1) * take, //(page - 1) * take,
    });
    return {
      data: posts,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      }
    }
  }
}
