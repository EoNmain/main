import { Injectable, NotFoundException } from '@nestjs/common';
import { Like } from './entities/like.entity';
import { LikePostDto } from './dto/like-post.dto';

@Injectable()
export class LikeService {
    private likes: Array<Like> = [];
    private lid = 0;

    like(likePostDto: LikePostDto){
        this.likes.push({
            lid: ++this.lid,
            ...likePostDto,
        });
    }
    findOne(lid:number){
        const found = this.likes.find((l) => l.lid === lid);
        if(!found) throw new NotFoundException();
        return found;
    }
    remove(lid:number){
        this.findOne(lid);
        this.likes = this.likes.filter((l)=>l.lid!==lid);
    }
}
