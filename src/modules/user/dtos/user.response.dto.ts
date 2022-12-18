import { Types } from 'mongoose';

export class UserResponseDto {
  _id?: Types.ObjectId;
  email: string;
  username: string;
}
