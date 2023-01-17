import { Types } from 'mongoose';

export class PostResponseDto {
  id?: Types.ObjectId;
  author: string;
  text: string;
  media: string;
  date: number;
  comments: Array<string>;
  likes: Array<string>;
}
