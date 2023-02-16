import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CommentResponseDto {
  @ApiProperty({ example: '6434fdh3cd4cfde9' })
  _id?: Types.ObjectId;

  @ApiProperty({ example: '6434fdh3cd4cfde9' })
  postId: Types.ObjectId | string;

  @ApiProperty({ example: '6434fdh3cd4cfde9' })
  author: string;

  @ApiProperty({ example: 'any text' })
  text: string;

  @ApiProperty({ example: 'https://anylink/file.png' })
  media: string;

  @ApiProperty({ example: '167797856' })
  date: number;

  @ApiProperty({ example: ['6434fdh3cd4cfde9', '6434fdh3cd4cfde9'] })
  likes: Array<string>;
}
