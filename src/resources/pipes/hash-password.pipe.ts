import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPassword implements PipeTransform {
  constructor(private configService: ConfigService) {}

  async transform(password: string) {
    const sal = this.configService.get<string>('HASH_PASS');

    const passHashed = await bcrypt.hash(password, sal);

    return passHashed;
  }
}
