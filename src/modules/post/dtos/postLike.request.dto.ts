import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostLikeRequestDto {
  @ApiProperty({ example: '67gdrj4325465bfcdef', required: true })
  @IsNotEmpty()
  @IsString()
  postId: string;

  @ApiProperty({ example: '67gdrj4325465bfcdef', required: true })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
