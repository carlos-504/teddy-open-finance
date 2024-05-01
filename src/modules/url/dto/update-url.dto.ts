import { PartialType } from '@nestjs/mapped-types';
import { ShortenUrlDTO } from './shorten-url.dto';

export class UpdateUrlDTO extends PartialType(ShortenUrlDTO) {}
