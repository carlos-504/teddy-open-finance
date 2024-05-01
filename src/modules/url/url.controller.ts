import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  ConsoleLogger,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { UrlService } from './url.service';
import { ShortenUrlDTO } from './dto/ShotenUrl.dto';
import { UpdateUrlDTO } from './dto/UpdateUrl.dto';

@Controller('url')
export class UrlController {
  constructor(
    private urlService: UrlService,
    private nativeLogger: ConsoleLogger,
  ) {}

  @Post()
  async shortenUrl(@Body() urlData: ShortenUrlDTO) {
    try {
      const url = await this.urlService.shortenUrl(urlData);

      return {
        data: url,
        message: 'url shortened successfully',
      };
    } catch (err) {
      throw err;
    }
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
      throw err;
    }
  }

  @Get()
  async getActiveUrls() {
    try {
      const urls = await this.urlService.listActiveUrls();

      return { data: urls, message: 'url listed successfully' };
    } catch (err) {
      throw err;
    }
  }

  @Put(':id')
  async updateUrl(@Param('id') urlId: string, @Body() urlData: UpdateUrlDTO) {
    try {
      const url = await this.urlService.updateUrl(urlId, urlData);

      return {
        data: url,
        message: 'url updated successfully',
      };
    } catch (err) {
      this.nativeLogger.error(err);
    }
  }

  @Delete(':id')
  async DeleteResult(@Param('id') urlId: string) {
    try {
      await this.urlService.deleteUrl(urlId);

      return { data: null, message: 'url successfully deleted' };
    } catch (err) {
      throw err;
    }
  }
}
