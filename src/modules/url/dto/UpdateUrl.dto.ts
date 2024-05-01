import { PartialType } from '@nestjs/mapped-types';
import { ShortenUrlDTO } from './ShotenUrl.dto';

export class UpdateUrlDTO extends PartialType(ShortenUrlDTO) {}
