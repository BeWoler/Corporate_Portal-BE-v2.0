import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class PostRequestDto {
  @ApiProperty({ example: '67gdrj4325465bfcdef', required: true })
  @IsNotEmpty()
  @IsString()
  author: Types.ObjectId;

  @ApiProperty({ example: 'Some Text' })
  @IsString()
  text: string;

  @ApiProperty({
    example: ['https://anylink/file.png', 'https://anylink/file.png'],
  })
  media: Array<string>;
}
