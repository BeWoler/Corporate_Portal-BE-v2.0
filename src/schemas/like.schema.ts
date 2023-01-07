import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LikeDocument = HydratedDocument<Like>;

@Schema()
export class Like {
  @Prop()
  user: string;

  @Prop()
  post: string;

  @Prop()
  comment: string;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
