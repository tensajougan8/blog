import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private readonly userService: UsersService,
  ) {}

  async validateUser(details: CreateUserDto) {
    console.log('AuthService');
    console.log(details);
    const user = await this.userService.findOneByEmail(details.email);
    console.log(user);
    if (user) return user;
    console.log('User not found. Creating...');
    const newUser = this.userService.create(details);
    return newUser;
  }

  async findUser(id: number) {
    const user = await this.userService.findOne(id);
    return user;
  }
}
