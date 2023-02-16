import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class PostResponseDto {
  @ApiProperty({ example: '476fb34gf354cdef9' })
  _id?: Types.ObjectId;

  @ApiProperty({ example: '476fb34gf354cdef9' })
  author: string;

  @ApiProperty({ example: 'any text' })
  text: string;

  @ApiProperty({ example: 'https://anylink/file.png' })
  media: string;

  @ApiProperty({ example: '16977707' })
  date: number;

  @ApiProperty({ example: ['476fb34gf354cdef9', '476fb34gf354cdef9'] })
  comments: Array<string>;

  @ApiProperty({ example: ['476fb34gf354cdef9', '476fb34gf354cdef9'] })
  likes: Array<string>;
}
