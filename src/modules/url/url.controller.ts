import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  ConsoleLogger,
} from '@nestjs/common';
import { Response } from 'express';
import { UrlService } from './url.service';
import { ShortenUrlDTO } from './dto/ShotenUrl.dto';

@Controller('url')
export class UrlController {
  constructor(
    private urlService: UrlService,
    private nativeLogger: ConsoleLogger,
  ) {}

  @Post()
  async shortenUrl(@Body() urlData: ShortenUrlDTO) {
    const url = await this.urlService.shortenUrl(urlData);

    return {
      message: url,
    };
  }

  @Get('redirect')
  async redirectShorUrlAndCountClick(
    @Query('url') shortUrl: string,
    @Res() resp: Response,
  ) {
    try {
      const url = await this.urlService.findAndCountClickUrl(shortUrl);

      resp.redirect(url);
    } catch (err) {
      this.nativeLogger.error(err);
    }
  }
}
