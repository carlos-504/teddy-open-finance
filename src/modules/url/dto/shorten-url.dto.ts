import { IsUrl, IsNotEmpty } from 'class-validator';

export class ShortenUrlDTO {
  id?: string;

  @IsUrl({ message: 'invalid URL' })
  @IsNotEmpty({ message: 'cannot be null' })
  url: string;
}
