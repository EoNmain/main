import { Injectable, NotFoundException } from '@nestjs/common';
import { Reply } from './entities/reply.entity';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';

@Injectable()
export class ReplyService {
    private replies: Array<Reply> = [];
    private pid = 0;

    create(createReplyDto: CreateReplyDto) {
        this.replies.push({
            pid: ++this.pid,
            ...createReplyDto,
            recommand: 0,
            check: 0,
            createdDate: new Date(),
        });
    }

    findAll() {
        return [...this.replies];
    }

    findOne(pid: number) {
        const found = this.replies.find((p) => p.pid === pid);
        if (!found) throw new NotFoundException();
        return found;
    }

    update(pid: number, updateReplyDto: UpdateReplyDto) {
        const found = this.findOne(pid);
        this.remove(pid);
        this.replies.push({ ...found, ...updateReplyDto, editDate: new Date() });
    }

    remove(pid: number) {
        this.findOne(pid);
        this.replies = this.replies.filter((p) => p.pid !== pid);
    }
}
