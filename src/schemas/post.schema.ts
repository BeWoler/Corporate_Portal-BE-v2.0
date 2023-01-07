import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ ref: 'User', required: true })
  author: string;

  @Prop()
  text: string;

  @Prop()
  media: string;

  @Prop()
  date: string;

  @Prop({ ref: 'Comment' })
  comments: Array<string>;

  @Prop({ ref: 'Like' })
  likes: Array<string>;
}

export const PostSchema = SchemaFactory.createForClass(Post);
