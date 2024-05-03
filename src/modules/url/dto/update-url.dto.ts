import { ShortenUrlDTO } from './shorten-url.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUrlDTO extends ShortenUrlDTO {
  @ApiProperty()
  id?: string;
}
