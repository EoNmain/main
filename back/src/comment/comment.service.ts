import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
    private comments: Array<Comment> = [];
    private cid = 0;

    create(createCommentDto: CreateCommentDto) {
        this.comments.push({
            cid: ++this.cid,
            ...createCommentDto,
            createdDate: new Date(),
        });
    }
    findAll() {
        return [...this.comments];
    }

    findOne(cid: number) {
        const found = this.comments.find((c) => c.cid === cid);
        if (!found) throw new NotFoundException();
        return found;
    }

    update(cid: number, updateCommentDto: UpdateCommentDto) {
        const found = this.findOne(cid);
        this.remove(cid);
        this.comments.push({ ...found, ...updateCommentDto, editDate: new Date() });
    }

    remove(cid: number) {
        this.findOne(cid);
        this.comments = this.comments.filter((c) => c.cid !== cid);
    }

}
