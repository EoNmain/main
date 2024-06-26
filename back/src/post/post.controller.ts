import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { post } from './entities/post.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  // @Get()
  // async all(@Query('page') page: number = 1): Promise<post[]> {
  //   return await this.postService.paginate(page);
  // }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findPost(@Query() query: any) {
    if (query.uid) {
      return this.postService.search(query.uid);
    } else if (query.title) {
      return this.postService.findTitle(query.title);
    } else if (query.writer) {
      return this.postService.findWriter(query.writer);
    } else if (query.content) {
      return this.postService.findContent(query.content);
    } else if (query.page) {
      return this.postService.paginate(query.page);
    } else {
      return this.postService.findAll();
    }
  }

  @Get(':pid')
  findOne(@Param('pid') pid: string) {
    return this.postService.findOne(+pid);
  }

  @Patch(':pid')
  update(@Param('pid') pid: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+pid, updatePostDto);
  }

  @Delete(':pid')
  remove(@Param('pid') pid: string) {
    return this.postService.remove(+pid);
  }
}
