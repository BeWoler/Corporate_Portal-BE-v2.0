import { Types } from 'mongoose';

export class CommentResponseDto {
  id?: Types.ObjectId;
  postId: Types.ObjectId | string;
  author: string;
  text: string;
  media: string;
  date: number;
  likes: Array<string>;
}
