import { IsNotEmpty, IsString } from 'class-validator';

export class PostRequestDto {
  @IsNotEmpty()
  @IsString()
  author: string;

  @IsString()
  text: string;

  @IsString()
  media: string;
}
