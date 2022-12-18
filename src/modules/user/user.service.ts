import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { errors } from 'src/errors/errors';
import { User, UserDocument } from 'src/schemas/user.schema';
import {
  GetUserResponseDto,
  GetUsersResponseDto,
} from './dtos/getUser.response.dto';
import { UserRequestDto } from './dtos/user.request.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(body: UserRequestDto): Promise<GetUserResponseDto> {
    const validEmail = await this.userModel.findOne({ email: body.email });
    const validUsername = await this.userModel.findOne({
      username: body.username,
    });

    if (validEmail || validUsername) {
      throw new HttpException(
        errors.USER_ALREADY_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userModel.create(body);
    user.password = await bcrypt.hash('troll', 5);

    return { user };
  }

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
