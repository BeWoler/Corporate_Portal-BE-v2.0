import {
  Controller,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { GetUserDataResponseDto } from './dtos/getUserData.response.dto';
import { UserDataRequestDto } from './dtos/userData.request.dto';
import { UserDataService } from './userData.service';
import { userDataSwagger } from './userData.swagger';

@ApiTags('UserData')
@Controller('userData')
export class UserDataController {
  constructor(private readonly userDataService: UserDataService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  @ApiOperation(userDataSwagger.GET_USER_DATA_BY_ID.descr)
  @ApiResponse(userDataSwagger.GET_USER_DATA_BY_ID.res)
  @HttpCode(HttpStatus.OK)
  async getUserData(
    @Param('id') userId: Types.ObjectId,
  ): Promise<GetUserDataResponseDto> {
    return this.userDataService.getUserData(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  @ApiOperation(userDataSwagger.UPDATE_USER_DATA_BY_ID.descr)
  @ApiResponse(userDataSwagger.UPDATE_USER_DATA_BY_ID.res)
  @HttpCode(HttpStatus.OK)
  async updateUserData(
    @Body() body: UserDataRequestDto,
    @Param('id') userId: Types.ObjectId,
  ): Promise<GetUserDataResponseDto> {
    return this.userDataService.updateUserData(userId, body);
  }
}
