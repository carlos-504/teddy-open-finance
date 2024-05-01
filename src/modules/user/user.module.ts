import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UniqueEmailValidator } from '../../utils/unique-email-validator';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserEntity])],
  controllers: [UserController],
  providers: [UserService, UniqueEmailValidator],
  exports: [],
})
export class UserModule {}
