import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user.response.dto';

export class GetUserResponseDto {
  @ApiProperty({
    example: {
      _id: '634gdvr4534cfe9',
      email: 'any@any.com',
      username: 'anyNick',
    },
  })
  user: UserResponseDto;
}

export class GetUsersResponseDto {
  @ApiProperty({
    example: [
      {
        _id: '634gdvr4534cfe9',
        email: 'any@any.com',
        username: 'anyNick',
      },
      {
        _id: '634gdvr4534cfe9',
        email: 'any2@any.com',
        username: 'anyNick2',
      },
    ],
  })
  users: Array<UserResponseDto>;
}
