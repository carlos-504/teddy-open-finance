import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'urls' })
export class UrlEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'original_url', length: 255, nullable: false })
  originalUrl: string;

  @Column({ name: 'short_url', length: 30, nullable: false })
  shortUrl: string;

  @Column({ name: 'clicks', nullable: true, default: 0 })
  clicks: number;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: string;

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: string;

  @ManyToOne(() => UserEntity, (user) => user.urls)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
