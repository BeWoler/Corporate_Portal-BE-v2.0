import { Controller, Get, Param } from '@nestjs/common';
import {
  GetUserResponseDto,
  GetUsersResponseDto,
} from './dtos/getUser.response.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<GetUsersResponseDto> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<GetUserResponseDto> {
    return this.userService.getUserById(id);
  }
}
