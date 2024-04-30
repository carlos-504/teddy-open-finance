import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'urls' })
export class UrlEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'original_url', length: 255, nullable: false })
  originalUrl: string;

  @Column({ name: 'short_url', length: 30, nullable: false })
  shortUrl: string;

  @Column({ name: 'clicks' })
  clicks: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @CreateDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToOne(() => UserEntity, { cascade: true, nullable: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
