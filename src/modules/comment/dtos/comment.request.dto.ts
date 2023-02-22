import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CommentRequestDto {
  @ApiProperty({ example: '6434fdh3cd4cfde9', required: true })
  @IsNotEmpty()
  postId: Types.ObjectId;

  @ApiProperty({ example: '6434fdh3cd4cfde9', required: true })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({ example: 'any text' })
  @IsString()
  text: string;

  @ApiProperty({
    example: ['https://anylink/file.png', 'https://anylink/file.png'],
  })
  media: Array<string>;
}
