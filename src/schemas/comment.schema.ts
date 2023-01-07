import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ ref: 'User', required: true })
  author: string;

  @Prop({ required: true })
  text: string;

  @Prop()
  media: string;

  @Prop()
  date: string;

  @Prop()
  likes: Array<string>;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
