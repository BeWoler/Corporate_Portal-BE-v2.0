import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import {
  GetUserResponseDto,
  GetUsersResponseDto,
} from './dtos/getUser.response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserById(id: string): Promise<GetUserResponseDto> {
    const user = await this.userModel
      .findOne({ _id: new Types.ObjectId(id) })
      .lean();
    user.password = await bcrypt.hash('troll', 5);

    return { user };
  }

  async getAllUsers(): Promise<GetUsersResponseDto> {
    const users = await this.userModel.find().lean();

    return { users };
  }
}
