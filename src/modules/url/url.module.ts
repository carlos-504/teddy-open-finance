import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './url.entity';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UrlEntity, UserEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class UserModule {}
