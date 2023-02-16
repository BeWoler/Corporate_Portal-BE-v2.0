import { Injectable } from '@nestjs/common';
import {
  GetUserResponseDto,
  GetUsersResponseDto,
} from './dtos/getUser.response.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: string): Promise<GetUserResponseDto> {
    return await this.userRepository.selectUserById(id);
  }

  async getAllUsers(): Promise<GetUsersResponseDto> {
    return await this.userRepository.selectAllUsers();
  }
}
