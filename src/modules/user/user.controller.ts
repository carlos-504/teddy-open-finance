import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async insertUser(@Body() userData: CreateUserDTO) {
    try {
      this.userService.createUser(userData);
    } catch (err) {
      throw err;
    }
  }
}
