import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDataDocument = HydratedDocument<UserData>;

@Schema()
export class UserData {
  @Prop({ ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ default: null })
  city: string;

  @Prop({ default: null })
  avatar: string;

  @Prop({ default: null })
  summary: string;

  @Prop({ default: null })
  linkedin: string;

  @Prop({ default: null })
  telegram: string;
}

export const UserDataSchema = SchemaFactory.createForClass(UserData);
