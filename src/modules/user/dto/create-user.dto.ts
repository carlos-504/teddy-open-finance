import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UniqueEmail } from '../../../utils/unique-email-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'name cannot be null' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'email cannot be null' })
  @UniqueEmail({ message: 'email has already been registered' })
  @IsEmail(undefined, { message: 'email provided is invalid' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'password cannot be null' })
  @MinLength(4, { message: 'password must be at least 4 characters long' })
  password: string;
}
