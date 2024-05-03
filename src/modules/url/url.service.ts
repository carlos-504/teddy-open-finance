import {
  BadRequestException,
  ConsoleLogger,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UrlEntity } from './url.entity';
import * as shortid from 'shortid';
import { CreateOrUpdateUrlInt } from './interfaces/url.interface';
import { UserReq } from '../authentication/interfaces/authentication.interface';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,
    private configService: ConfigService,
    @Inject(REQUEST) private readonly req: UserReq,
    private nativeLogger: ConsoleLogger,
  ) {}

  async shortenUrl(urlData: CreateOrUpdateUrlInt) {
    try {
      const { url, userId } = urlData;
      this.nativeLogger.log('creating url...');
      const urlCreated = await this.createOrUpdateUrl({ url, userId });
      this.nativeLogger.log('url created');

      return urlCreated;
    } catch (err) {
      throw new BadRequestException('unable to shorten the url');
    }
  }

  async findAndCountClickUrl(shortUrl: string) {
    try {
      this.nativeLogger.log('searching url...');
      const url = await this.urlRepository.findOne({
        where: { shortUrl, deletedAt: IsNull() },
      });

      if (!url) {
        throw new NotFoundException('url was not found');
      }
      this.nativeLogger.log('url found');

      this.nativeLogger.log('counting click...');
      url.clicks++;
      const urlUpdated = await this.urlRepository.update(url.id, url);
      this.nativeLogger.log('click counted');

      if (urlUpdated.affected === 0) {
        throw new BadRequestException('unable to redirect to url');
      }

      return url.originalUrl;
    } catch (err) {
      throw err;
    }
  }

  async listActiveUrls() {
    const userId = this.req.user.sub;
    this.nativeLogger.log('searching urls...');
    const urls = await this.urlRepository.find({
      where: { deletedAt: IsNull(), userId },
    });

    if (!urls.length) {
      throw new NotFoundException('no urls found');
    }

    this.nativeLogger.log('urls found');

    return urls;
  }

  async updateUrl(urlData: CreateOrUpdateUrlInt) {
    try {
      const { id, url, userId } = urlData;
      this.nativeLogger.log('searching url...');
      const findUrl = await this.urlRepository.findOneBy({
        id: parseInt(id),
        deletedAt: IsNull(),
        userId,
      });

      if (!findUrl) {
        throw new NotFoundException('url was not found');
      }
      this.nativeLogger.log('url found');

      this.nativeLogger.log('updating url');
      const newUrl = await this.createOrUpdateUrl({
        url,
        id,
        userId,
        clicks: findUrl.clicks,
      });
      this.nativeLogger.log('updated url...');

      return newUrl;
    } catch (err) {
      throw err;
    }
  }

  async deleteUrl(urlId: string) {
    try {
      const userId = this.req.user.sub;
      this.nativeLogger.log('searching url...');
      const url = await this.urlRepository.findOneBy({
        id: parseInt(urlId),
        deletedAt: IsNull(),
        userId,
      });

      if (!url) {
        throw new NotFoundException('url was not found');
      }
      this.nativeLogger.log('url found');

      this.nativeLogger.log('deleting url...');
      const deleteResult = await this.urlRepository.softDelete(urlId);
      this.nativeLogger.log('deleted url');

      if (deleteResult.affected === 0) {
        throw new BadRequestException('unable to delete url');
      }
    } catch (err) {
      throw err;
    }
  }

  private async createOrUpdateUrl(urlData: CreateOrUpdateUrlInt) {
    const shortCode = shortid.generate().substring(0, 6);
    const shortUrl = `${this.configService.get<string>(
      'SHORT_BASE_URL',
    )}/${shortCode}`;

    const { url, userId, id, clicks } = urlData;

    if (id) {
      return this.urlRepository.save({
        id: parseInt(id),
        originalUrl: url,
        shortUrl,
        userId: userId,
        clicks,
      });
    } else {
      return this.urlRepository.save({
        originalUrl: url,
        shortUrl,
        userId: userId,
      });
    }
  }
}
