import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt/dist';
import { Model, Types } from 'mongoose';
import { Token, TokenDocument } from 'src/schemas/token.schema';
import { Tokens } from 'src/types/tokens.type';
import { AuthDto } from './dtos/auth.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { hashData } from 'src/helpers/hashData';
import { errors } from 'src/errors/errors';
import { GetUserResponseDto } from '../user/dtos/getUser.response.dto';
import { compareData } from 'src/helpers/compareData';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(body: AuthDto): Promise<Tokens & GetUserResponseDto> {
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

    const tokens = await this.getTokens(user.id, user.email, user.username);
    return { user, ...tokens };
  }

  async signin(body: AuthDto): Promise<Tokens & GetUserResponseDto> {
    const user = await this.userModel.findOne({
      email: body.email,
      username: body.username,
    });

    if (!user) {
      throw new HttpException(errors.USER_IS_NOT_EXIST, HttpStatus.BAD_REQUEST);
    }

    const passwordMatches = await compareData(user.password, body.password);

    if (!passwordMatches) {
      throw new HttpException(errors.INVALID_CREDO, HttpStatus.BAD_REQUEST);
    }

    const tokens = await this.getTokens(user._id, user.email, user.username);
    await this.updateRtHash(user._id, tokens.refreshToken);
    return { user, ...tokens };
  }

  async logout(id: string | Types.ObjectId) {
    const logout = await this.tokenModel.findOneAndDelete({
      user: new Types.ObjectId(id),
    });
    return logout ? true : false;
  }

  async refresh(id: string, rt: string) {
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

    const tokens = await this.getTokens(user._id, user.email, user.username);
    await this.updateRtHash(user._id, tokens.refreshToken);

    return { user, ...tokens };
  }

  async getTokens(
    userId: string | Types.ObjectId,
    email: string,
    username: string,
  ) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          email,
        },
        {
          secret: process.env.AT_SECRET,
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          email,
        },
        {
          secret: process.env.RT_SECRET,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

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

  async updateRtHash(userId: string | Types.ObjectId, rt: string) {
    const hash = await hashData(rt);
    await this.tokenModel.findOneAndUpdate({ _id: userId }, { refreshT: hash });
  }
}
