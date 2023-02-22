import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class UserDataRequestDto {
  @ApiProperty({ example: '634gfd54fdec9', required: true })
  @IsNotEmpty()
  userId: Types.ObjectId;

  @ApiProperty({ example: 'Minsk' })
  city: string;

  @ApiProperty({ example: 'https://cloud/user/fgrv.png' })
  avatar: string;

  @ApiProperty({ example: 'Any user bio...' })
  summary: string;

  @ApiProperty({ example: 'https://linkedin.com/fdfdf/dfd' })
  linkedin: string;

  @ApiProperty({ example: 't.me/user' })
  telegram: string;
}
