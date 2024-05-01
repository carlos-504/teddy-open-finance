import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
  UpdateDateColumn,
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

  @Column({ name: 'clicks', nullable: true, default: 0 })
  clicks: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: string;

  @OneToOne(() => UserEntity, { cascade: true, nullable: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
