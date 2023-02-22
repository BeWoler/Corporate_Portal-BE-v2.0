import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { errors } from 'src/errors/errors';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserData, UserDataDocument } from 'src/schemas/userData.schema';
import { GetUserDataResponseDto } from './dtos/getUserData.response.dto';
import { UserDataRequestDto } from './dtos/userData.request.dto';

@Injectable()
export class UserDataRepository {
  constructor(
    @InjectModel(UserData.name) private userDataModel: Model<UserDataDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async insertUserData(
    userId: Types.ObjectId,
    body?: UserDataRequestDto,
  ): Promise<GetUserDataResponseDto> {
    const user = await this.userModel.findOne({
      _id: body ? body.userId : userId,
    });

    if (!user)
      throw new HttpException(errors.USER_IS_NOT_EXIST, HttpStatus.BAD_REQUEST);

    const userData = await this.userDataModel.create(body && body);
    userData.userId = userId;

    return { userData };
  }

  async selectUserDataById(
    userId: Types.ObjectId,
  ): Promise<GetUserDataResponseDto> {
    const populateQuery = { path: 'userId' };
    const userData = await this.userDataModel
      .findOne({ userId: userId })
      .populate(populateQuery)
      .lean();

    return { userData };
  }

  async updateUserDataById(
    userId: Types.ObjectId,
    body: UserDataRequestDto,
  ): Promise<GetUserDataResponseDto> {
    const populateQuery = { path: 'userId' };
    const userData = await this.userDataModel
      .findOneAndUpdate({ userId: userId }, { $set: body }, { new: true })
      .populate(populateQuery)
      .lean();

    return { userData };
  }
}
