import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Post } from "src/post/entities/post.entity";

export const typeORMConfigPost : TypeOrmModuleOptions= {
    //name: 'default',
    type: 'mysql',
    host: 'localhost',
    port: 3305,
    username: 'root',
    password: 'password',
    database: 'post',
    entities: [
        Post
      ],
    synchronize: true,
    // logging: true
}