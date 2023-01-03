import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {
  @Prop()
  user: string;

  @Prop()
  refreshT: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
