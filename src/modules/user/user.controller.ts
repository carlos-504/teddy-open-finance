import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { HashPassword } from 'src/resources/pipes/hash-password.pipe';
import { ApiTags } from '@nestjs/swagger';
import { Log } from 'src/utils/request-logs';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async insertUser(
    @Body() userData: CreateUserDTO,
    @Body('password', HashPassword) password: string,
    @Log() _,
  ) {
    try {
      const user = await this.userService.createUser({ ...userData, password });

      return user;
    } catch (err) {
      throw err;
    }
  }
}
