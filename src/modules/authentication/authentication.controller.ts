import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationDto } from './dto/create-authentication.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AUTH')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  @HttpCode(200)
  login(@Body() authentication: AuthenticationDto) {
    try {
      return this.authenticationService.login(authentication);
    } catch (err) {
      throw err;
    }
  }
}
