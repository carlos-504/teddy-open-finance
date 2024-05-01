import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationDto } from './dto/create-authentication.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  login(@Body() authentication: AuthenticationDto) {
    try {
      return this.authenticationService.login(authentication);
    } catch (err) {
      throw err;
    }
  }
}