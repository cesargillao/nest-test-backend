import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDTO, LoginUserDTO, VerifyUserDTO } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    // console.log(createUserDTO);
    await this.userService.create(createUserDTO);

    const user = await this.userService.find(createUserDTO);
    if (user) {
      user.password = '';
    }
    return user;
  }

  @Post('/login')
  async find(@Body() loginUserDTO: LoginUserDTO): Promise<User> {
    const user = await this.userService.find(loginUserDTO);
    if (user) {
      user.password = '';
    }
    return user;
  }

  @Post('/verify')
  async verify(@Body() cred: VerifyUserDTO): Promise<User> {
    const user = await this.userService.verify(cred);
    if (user) {
      user.password = '';
    }
    return user;
  }
}
