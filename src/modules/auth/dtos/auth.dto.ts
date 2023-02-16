import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class AuthSignInDto {
  @ApiProperty({ example: 'any@any.com', required: true })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: 'anyPass123', required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class AuthSignUpDto extends AuthSignInDto {
  @ApiProperty({ example: 'anyUsername', required: true })
  @IsNotEmpty()
  @IsString()
  username: string;
}
