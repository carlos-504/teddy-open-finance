import { ConsoleLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './url.entity';
import { UserEntity } from '../user/user.entity';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';

@Module({
  imports: [TypeOrmModule.forFeature([UrlEntity, UserEntity])],
  controllers: [UrlController],
  providers: [UrlService, ConsoleLogger],
  exports: [],
})
export class UrlModule {}
