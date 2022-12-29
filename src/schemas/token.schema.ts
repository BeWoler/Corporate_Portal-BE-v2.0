import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {
  @Prop()
  refreshT: string;

  @Prop()
  accessT: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
