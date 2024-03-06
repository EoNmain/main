import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikePostDto } from './dto/like-post.dto';

@Controller('like')
export class LikeController {
    constructor(private readonly likeService: LikeService){}

    @Post()
    like(@Body() likePostDto:LikePostDto){
        return this.likeService.like(likePostDto);
    }

    @Delete(':lid')
    remove(@Param('lid') lid:string){
        return this.likeService.remove(+lid);
    }
}
