import { Body, Controller, Post } from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortenUrlDTO } from './dto/ShotenUrl.dto';

@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Post()
  async shortenUrl(@Body() urlData: ShortenUrlDTO) {
    const url = await this.urlService.shortenUrl(urlData);

    return {
      message: url,
    };
  }
}
