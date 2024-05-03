import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  Req,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UrlService } from './url.service';
import { UpdateUrlDTO } from './dto/update-url.dto';
import { ShortenUrlDTO } from './dto/shorten-url.dto';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { UserReq } from '../authentication/interfaces/authentication.interface';
import { Public } from 'src/utils/public-route';
import { ApiTags, ApiHeader } from '@nestjs/swagger';

@ApiHeader({
  name: 'Authorization',
  description: 'Bearer Token',
})
@ApiTags('URL')
@UseGuards(AuthenticationGuard)
@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Public()
  @Post()
  async shortenUrl(@Req() req: UserReq, @Body() urlData: ShortenUrlDTO) {
    try {
      const userId = req.user ? req.user.sub : null;
      const url = await this.urlService.shortenUrl({ ...urlData, userId });

      return {
        data: url,
        message: 'url shortened successfully',
      };
    } catch (err) {
      throw err;
    }
  }

  @Public()
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
  async updateUrl(
    @Req() req: UserReq,
    @Param('id') urlId: string,
    @Body() urlData: UpdateUrlDTO,
  ) {
    try {
      const userId = req.user.sub;
      const url = await this.urlService.updateUrl({
        userId,
        url: urlData.url,
        id: urlId,
      });

      return {
        data: url,
        message: 'url updated successfully',
      };
    } catch (err) {
      throw err;
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
