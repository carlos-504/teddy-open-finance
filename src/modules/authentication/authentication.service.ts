import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthenticationDto } from './dto/create-authentication.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './interfaces/authentication.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(createAuthenticationDto: AuthenticationDto) {
    const { email, password } = createAuthenticationDto;

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('email or password incorrect');
    }

    const authUser = await bcrypt.compare(password, user.password);

    if (!authUser) {
      throw new UnauthorizedException('email or password incorrect');
    }

    const payload: UserPayload = {
      sub: user.id,
      userName: user.name,
    };

    return { token: await this.jwtService.signAsync(payload) };
  }
}
