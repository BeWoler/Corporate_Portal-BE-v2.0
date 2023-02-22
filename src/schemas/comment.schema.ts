import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ ref: 'Post', required: true })
  postId: string;

  @Prop({ ref: 'User', required: true })
  author: string;

  @Prop({ required: true })
  text: string;

  @Prop({ default: [] })
  media: Array<string>;

  @Prop({ default: new Date() })
  date: number;

  @Prop()
  likes: Array<string>;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
