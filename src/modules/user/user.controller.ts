import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  GetUserResponseDto,
  GetUsersResponseDto,
} from './dtos/getUser.response.dto';
import { UserService } from './user.service';
import { userSwagger } from './user.swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation(userSwagger.GET_ALL_USERS.descr)
  @ApiResponse(userSwagger.GET_ALL_USERS.res)
  @HttpCode(HttpStatus.OK)
  async getAllUsers(): Promise<GetUsersResponseDto> {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation(userSwagger.GET_USER_BY_ID.descr)
  @ApiResponse(userSwagger.GET_USER_BY_ID.res)
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: string): Promise<GetUserResponseDto> {
    return this.userService.getUserById(id);
  }
}
