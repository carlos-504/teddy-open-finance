import { IsUrl, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ShortenUrlDTO {
  @ApiProperty()
  @IsUrl({ message: 'invalid URL' })
  @IsNotEmpty({ message: 'url cannot be null' })
  url: string;
}
