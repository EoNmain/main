import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Token } from './token.entity';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export enum Role {
  Admin = 'admin',
}

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumberString()
  period: string;

  @IsNumberString()
  phone: string;

  @IsNumberString()
  sid: string;

  @IsString()
  email: string;

  @IsEnum(Role)
  role: Role;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  period: string;

  @Column()
  sid: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: Role, nullable: true })
  role: Role;

  @Exclude()
  @OneToOne(() => Token, (token) => token.user)
  token: Token;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
