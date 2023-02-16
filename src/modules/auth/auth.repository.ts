import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { errors } from 'src/errors/errors';
import { compareData } from 'src/helpers/compareData';
import { hashData } from 'src/helpers/hashData';
import { Token, TokenDocument } from 'src/schemas/token.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Tokens } from 'src/types/tokens.type';
import { GetUserResponseDto } from '../user/dtos/getUser.response.dto';
import { AuthSignInDto, AuthSignUpDto } from './dtos/auth.dto';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async insertUserAndTokens(
    body: AuthSignUpDto,
  ): Promise<Tokens & GetUserResponseDto> {
    const hash = await hashData(body.password);
    const validEmail = await this.userModel.findOne({ email: body.email });
    const validUsername = await this.userModel.findOne({
      username: body.username,
    });

    if (validEmail || validUsername) {
      throw new HttpException(
        errors.USER_ALREADY_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userModel.create({
      email: body.email,
      username: body.username,
      password: hash,
    });

    user.password = await hashData('troll');

    const tokens = await this.selectTokens(user.id, user.email, user.username);
    return { user, ...tokens };
  }

  async selectUserAndTokens(
    body: AuthSignInDto,
  ): Promise<Tokens & GetUserResponseDto> {
    const user = await this.userModel.findOne({
      email: body.email,
    });

    if (!user) {
      throw new HttpException(errors.USER_IS_NOT_EXIST, HttpStatus.BAD_REQUEST);
    }

    const passwordMatches = await compareData(user.password, body.password);

    if (!passwordMatches) {
      throw new HttpException(errors.INVALID_CREDO, HttpStatus.BAD_REQUEST);
    }

    const tokens = await this.selectTokens(user._id, user.email, user.username);
    await this.updateRtHash(user._id, tokens.refreshToken);
    return { user, ...tokens };
  }

  async logout(id: string | Types.ObjectId): Promise<boolean> {
    const logout = await this.tokenModel.findOneAndDelete({
      user: new Types.ObjectId(id),
    });
    return logout ? true : false;
  }

  async updateTokens(
    id: string,
    rt: string,
  ): Promise<Tokens & GetUserResponseDto> {
    const user = await this.userModel.findOne({ _id: id });

    if (!user) {
      throw new HttpException(errors.USER_IS_NOT_EXIST, HttpStatus.BAD_REQUEST);
    }

    const userToken = await this.tokenModel.findOne({ user: id });

    if (!userToken) {
      throw new HttpException(errors.ACCESS_DENIED, HttpStatus.BAD_REQUEST);
    }

    const tokenMatches = userToken.refreshT === rt;

    if (!tokenMatches) {
      throw new HttpException(errors.ACCESS_DENIED, HttpStatus.BAD_REQUEST);
    }

    const tokens = await this.selectTokens(user._id, user.email, user.username);
    await this.updateRtHash(user._id, tokens.refreshToken);

    return { user, ...tokens };
  }

  async selectTokens(
    userId: string | Types.ObjectId,
    rt: string,
    at: string,
  ): Promise<Tokens> {
    await this.tokenModel.findOneAndDelete({
      user: userId,
    });

    await this.tokenModel.create({
      user: userId,
      refreshT: rt,
    });

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async updateRtHash(
    userId: string | Types.ObjectId,
    rt: string,
  ): Promise<void> {
    const hash = await hashData(rt);
    await this.tokenModel.findOneAndUpdate({ _id: userId }, { refreshT: hash });
  }
}
