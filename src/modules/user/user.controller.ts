import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  GetUserResponseDto,
  GetUsersResponseDto,
} from './dtos/getUser.response.dto';
import { UserRequestDto } from './dtos/user.request.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: UserRequestDto): Promise<GetUserResponseDto> {
    body.password = await bcrypt.hash(body.password, 5);
    return this.userService.createUser(body);
  }

  @Get()
  async getAllUsers(): Promise<GetUsersResponseDto> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<GetUserResponseDto> {
    return this.userService.getUserById(id);
  }
}
