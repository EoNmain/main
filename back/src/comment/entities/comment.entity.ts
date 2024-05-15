import { post } from 'src/post/entities/post.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

// export class Comment {
//     cid: number;
//     uid: number;
//     pid: number;
//     content: string;
//     createdDate: Date;
//     editDate?: Date; // Null 허용
// }

@Entity()
export class Comment {
  @PrimaryGeneratedColumn({ type: 'int' })
  cid: number;

  @Column({ type: 'int' })
  pid: number;

  @Column({ type: 'int' })
  uid: number;

  @ManyToOne(() => post, (post) => post.comments)
  post: post;

  @Column({ type: 'varchar' })
  writer: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp', default: null })
  editDate?: Date;
}
