import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from './url.entity';
import { ShortenUrlDTO } from './dto/ShotenUrl.dto';
import * as shortid from 'shortid';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,
  ) {}

  async shortenUrl(urlData: ShortenUrlDTO) {
    const shortCode = shortid.generate();
    const shortUrl = `localhost/${shortCode}`;

    return this.urlRepository.save({
      originalUrl: urlData.url,
      shortUrl: shortUrl,
    });
  }
}
