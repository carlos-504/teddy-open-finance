import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private nativeLogger: ConsoleLogger,
  ) {}

  async createUser(userData: CreateUserDTO) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.nativeLogger.log('creating user...');
      const { password, deletedAt, ...restUser } =
        await this.userRepository.save(userData);
      this.nativeLogger.log('user created');

      return restUser;
    } catch (err) {
      throw err;
    }
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }
}
