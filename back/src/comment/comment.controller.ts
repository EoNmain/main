import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Auth } from 'src/common/decorator/auth.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @Patch(':cid')
  update(
    @Param('cid') cid: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(+cid, updateCommentDto);
  }

  @Delete(':cid')
  remove(@Param('cid') cid: string) {
    return this.commentService.removeComment(+cid);
  }

  @Get(':cid')
  find(@Param('cid') cid: string) {
    return this.commentService.findCommentId(+cid);
  }

  @Get()
  findAll(@Query('pid') pid: number) {
    return this.commentService.findPostComment(pid);
  }
}
