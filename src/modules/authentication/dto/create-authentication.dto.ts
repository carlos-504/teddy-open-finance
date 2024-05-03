import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthenticationDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'email cannot be null' })
  @IsEmail(undefined, { message: 'email provided is invalid' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'password cannot be null' })
  password: string;
}
