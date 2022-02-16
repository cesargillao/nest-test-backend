import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDTO, LoginUserDTO, VerifyUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    createUserDTO.token = new Date().getTime() + createUserDTO.username;
    const createdUser = new this.userModel(createUserDTO);
    return createdUser.save();
  }

  async find(cred: LoginUserDTO): Promise<User> {
    return this.userModel
      .findOne({ username: cred.username, password: cred.password })
      .exec();
  }

  async verify(cred: VerifyUserDTO): Promise<User> {
    return this.userModel.findOne({ token: cred.token }).exec();
  }
}
