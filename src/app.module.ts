import { ConsoleLogger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlModule } from './modules/url/url.module';
import { UserModule } from './modules/user/user.module';
import { PostgresConfigService } from './config/postgres.config.service';
import { GlobalException } from './resources/filters/global-exception.filter';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [
    UserModule,
    UrlModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    AuthenticationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalException,
    },
    ConsoleLogger,
  ],
})
export class AppModule {}
