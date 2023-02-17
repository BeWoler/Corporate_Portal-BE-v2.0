import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Tokens } from 'src/types/tokens.type';
import { AuthSignInDto, AuthSignUpDto } from './dtos/auth.dto';
import { GetUserResponseDto } from '../user/dtos/getUser.response.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async signup(body: AuthSignUpDto): Promise<Tokens & GetUserResponseDto> {
    return await this.authRepository.insertUserAndTokens(body);
  }

  async signin(body: AuthSignInDto): Promise<Tokens & GetUserResponseDto> {
    return await this.authRepository.selectUserAndTokens(body);
  }

  async logout(id: string | Types.ObjectId) {
    return await this.authRepository.logout(id);
  }

  async refresh(id: string, rt: string) {
    return await this.authRepository.updateTokens(id, rt);
  }

  async getTokens(
    userId: string | Types.ObjectId,
    email: string,
    username: string,
  ) {
    return await this.authRepository.selectTokens(userId, email, username);
  }

  async updateRtHash(userId: string | Types.ObjectId, rt: string) {
    return await this.authRepository.updateRtHash(userId, rt);
  }
}
