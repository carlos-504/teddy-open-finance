import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
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
      const { url } = urlData;
      const urlCreated = this.createOrUpdateUrl({ url });

      return urlCreated;
    } catch (err) {
      throw new BadRequestException('unable to shorten the url');
    }
  }

  async findAndCountClickUrl(shortUrl: string) {
    try {
      const url = await this.urlRepository.findOne({
        where: { shortUrl, deletedAt: IsNull() },
      });

      if (!url) {
        throw new NotFoundException('url was not found');
      }

      url.clicks++;
      const urlUpdated = await this.urlRepository.update(url.id, url);

      if (urlUpdated.affected === 0) {
        throw new BadRequestException('unable to redirect to url');
      }

      return url.originalUrl;
    } catch (err) {
      throw err;
    }
  }

  async listActiveUrls() {
    const urls = await this.urlRepository.find({
      where: { deletedAt: IsNull() },
    });

    if (!urls.length) {
      throw new NotFoundException('no urls found');
    }

    return urls;
  }

  async updateUrl(idUrl: string, urlData: UpdateUrlDTO) {
    try {
      const url = await this.urlRepository.findOneBy({
        id: idUrl,
        deletedAt: IsNull(),
      });

      if (!url) {
        throw new NotFoundException('url was not found');
      }

      Object.assign(urlData, url);

      const newUrl = this.createOrUpdateUrl(urlData as ShortenUrlDTO);

      return newUrl;
    } catch (err) {
      throw err;
    }
  }

  async deleteUrl(idUrl: string) {
    try {
      const url = await this.urlRepository.findOneBy({
        id: idUrl,
        deletedAt: IsNull(),
      });

      if (!url) {
        throw new NotFoundException('url was not found');
      }

      const deleteResult = await this.urlRepository.softDelete(idUrl);

      if (deleteResult.affected === 0) {
        throw new BadRequestException('unable to delete url');
      }
    } catch (err) {
      throw err;
    }
  }

  private async createOrUpdateUrl(url: ShortenUrlDTO) {
    const shortCode = shortid.generate().substring(0, 6);
    const shortUrl = `${this.configService.get<string>(
      'SHORT_BASE_URL',
    )}/${shortCode}`;

    if (url.id) {
      return this.urlRepository.save({
        id: url.id,
        originalUrl: url.url,
        shortUrl,
      });
    } else {
      return this.urlRepository.save({
        originalUrl: url.url,
        shortUrl,
      });
    }
  }
}
