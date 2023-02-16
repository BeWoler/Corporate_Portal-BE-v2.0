import { ApiProperty } from '@nestjs/swagger/dist';
import { Types } from 'mongoose';

export class UserResponseDto {
  @ApiProperty({ example: '634gdvr4534cfe9' })
  _id?: Types.ObjectId;

  @ApiProperty({ example: 'any@any.com' })
  email: string;

  @ApiProperty({ example: 'anyNick' })
  username: string;
}
