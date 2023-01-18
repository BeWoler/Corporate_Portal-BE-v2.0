import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CommentRequestDto {
  @IsNotEmpty()
  postId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsString()
  text: string;

  @IsString()
  media: string;
}
