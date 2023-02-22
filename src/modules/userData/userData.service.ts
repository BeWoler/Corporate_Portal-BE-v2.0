import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { GetUserDataResponseDto } from './dtos/getUserData.response.dto';
import { UserDataRequestDto } from './dtos/userData.request.dto';
import { UserDataRepository } from './userData.repository';

@Injectable()
export class UserDataService {
  constructor(private readonly userDataRepository: UserDataRepository) {}

  async createUserData(
    userId: Types.ObjectId,
    body?: UserDataRequestDto,
  ): Promise<GetUserDataResponseDto> {
    return await this.userDataRepository.insertUserData(userId, body);
  }

  async getUserData(userId: Types.ObjectId): Promise<GetUserDataResponseDto> {
    return await this.userDataRepository.selectUserDataById(userId);
  }

  async updateUserData(
    userId: Types.ObjectId,
    body: UserDataRequestDto,
  ): Promise<GetUserDataResponseDto> {
    return this.userDataRepository.updateUserDataById(userId, body);
  }
}
