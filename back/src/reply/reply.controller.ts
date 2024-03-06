import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';

@Controller('reply')
export class ReplyController {
    constructor(private readonly replyService: ReplyService) { }

    @Post()
    create(@Body() createReplyDto: CreateReplyDto) {
        return this.replyService.create(createReplyDto);
    }

    @Get()
    findAll() {
        return this.replyService.findAll();
    }

    @Get(':pid')
    findOne(@Param('pid') pid: string) {
        return this.replyService.findOne(+pid);
    }

    @Patch(':pid')
    update(@Param('pid') pid: string, @Body() updateReplyDto: UpdateReplyDto) {
        return this.replyService.update(+pid, updateReplyDto);
    }

    @Delete(':pid')
    remove(@Param('pid') pid: string) {
        return this.replyService.remove(+pid);
    }
}
