import { IsUrl, IsNotEmpty } from 'class-validator';

export class ShortenUrlDTO {
  id?: string;

  @IsUrl({ message: 'invalid URL' })
  @IsNotEmpty({ message: 'url cannot be null' })
  url: string;
}
