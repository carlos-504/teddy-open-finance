import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UrlEntity } from './url.entity';
import { ShortenUrlDTO } from './dto/ShotenUrl.dto';
import * as shortid from 'shortid';
import { UpdateUrlDTO } from './dto/UpdateUrl.dto';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,
    private configService: ConfigService,
  ) {}

  async shortenUrl(urlData: ShortenUrlDTO) {
    try {
      const shortCode = shortid.generate().substring(0, 6);
      const shortUrl = `${this.configService.get<string>(
        'SHORT_BASE_URL',
      )}/${shortCode}`;

      const url = this.urlRepository.save({
        originalUrl: urlData.url,
        shortUrl,
      });

      return url;
    } catch (err) {
      throw new BadRequestException('unable to shorten the url');
    }
  }

  async findAndCountClickUrl(shortUrl: string) {
    try {
      const url = await this.urlRepository.findOne({
        where: { shortUrl },
      });

      if (!url) {
        throw new NotFoundException('url was not found');
      }

      url.clicks++;
      this.urlRepository.save(url);

      return url.originalUrl;
    } catch (err) {
      throw new BadRequestException('unable to redirect to url');
    }
  }

  async updateUrl(idUrl: string, urlData: UpdateUrlDTO) {
    try {
      const url = await this.urlRepository.findOneBy({ id: idUrl });

      if (!url) {
        throw new NotFoundException('url was not found');
      }

      const shortCode = shortid.generate().substring(0, 6);
      const shortUrl = `${this.configService.get<string>(
        'SHORT_BASE_URL',
      )}/${shortCode}`;

      const newUrl = this.urlRepository.save({
        originalUrl: urlData.url,
        shortUrl,
      });

      return newUrl;
    } catch (err) {
      throw new BadRequestException('error updating url');
    }
  }
}
