import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ ref: 'User', required: true })
  author: string;

  @Prop()
  text: string;

  @Prop({ default: null })
  media: string;

  @Prop({ default: new Date() })
  date: number;

  @Prop({ ref: 'Comment', default: [] })
  comments: Array<string>;

  @Prop({ ref: 'Like', default: [] })
  likes: Array<string>;
}

export const PostSchema = SchemaFactory.createForClass(Post);
