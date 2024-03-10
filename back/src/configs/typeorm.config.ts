import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Post } from "src/post/entities/post.entity";

export const typeORMConfigPost : TypeOrmModuleOptions= {
    //name: 'default',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'auth_service',
    entities: [
        Post
      ],
    synchronize: true,
    // logging: true
}