import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthenticationDto {
  @IsNotEmpty({ message: 'email cannot be null' })
  @IsEmail(undefined, { message: 'email provided is invalid' })
  email: string;

  @IsNotEmpty({ message: 'password cannot be null' })
  password: string;
}
