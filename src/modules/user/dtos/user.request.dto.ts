import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserRequestDto {
  @ApiProperty({ example: 'any@any.com', required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'anyNick', required: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'helloThisIsMyPass', required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}
