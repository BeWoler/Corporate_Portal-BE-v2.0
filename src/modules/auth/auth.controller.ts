import {
  Body,
  Controller,
  HttpCode,
  Headers,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthGuard } from '@nestjs/passport';
import { Tokens } from 'src/types/tokens.type';
import { GetUserResponseDto } from '../user/dtos/getUser.response.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthDto } from './dtos/auth.dto';
import { IncomingHttpHeaders } from 'http';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() body: AuthDto): Promise<Tokens & GetUserResponseDto> {
    return this.authService.signup(body);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() body: AuthDto): Promise<Tokens & GetUserResponseDto> {
    return this.authService.signin(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request): Promise<boolean> {
    const user = req.user;
    return this.authService.logout(user['sub']);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Headers() headers: IncomingHttpHeaders,
  ): Promise<Tokens & GetUserResponseDto> {
    const user = req.user;
    const token = headers.authorization.split(' ')[1];
    return this.authService.refresh(user['sub'], token);
  }
}
