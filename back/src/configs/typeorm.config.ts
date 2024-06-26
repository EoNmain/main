import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { post } from 'src/post/entities/post.entity';

export const typeORMConfigPost: TypeOrmModuleOptions = {
  //name: 'default',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'auth_service',
  entities: [post, Comment],
  synchronize: true,
  // logging: true
};
