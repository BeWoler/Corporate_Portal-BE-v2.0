import {
  Body,
  Controller,
  HttpCode,
  Headers,
  Post,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthGuard } from '@nestjs/passport';
import { Tokens } from 'src/types/tokens.type';
import { GetUserResponseDto } from '../user/dtos/getUser.response.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthSignInDto, AuthSignUpDto } from './dtos/auth.dto';
import { IncomingHttpHeaders } from 'http';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body() body: AuthSignUpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens & GetUserResponseDto> {
    const userData = await this.authService.signup(body);
    res.cookie('rtToken', userData.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return userData;
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body() body: AuthSignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens & GetUserResponseDto> {
    const userData = await this.authService.signin(body);
    res.cookie('rtToken', userData.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return userData;
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
