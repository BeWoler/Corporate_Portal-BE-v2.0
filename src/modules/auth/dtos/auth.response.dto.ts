import { ApiProperty } from '@nestjs/swagger';
import { GetUserResponseDto } from 'src/modules/user/dtos/getUser.response.dto';
import { GetUserDataResponseDto } from 'src/modules/userData/dtos/getUserData.response.dto';

export class AuthResponseDto {
  @ApiProperty({
    example:
      'Y2NTFlMTQiLCJ1c2VybmFtZSI6IkJlV29sZXIiLCJlbWFpbCI6ImJld29sZXJAZ21haWwuY29tIiwiaWF0IjoxNjc2NTYxNzYyLCJl',
  })
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2VhNTBmMzg4NmIwZTZhM',
  })
  refreshToken: string;

  @ApiProperty({
    example: {
      _id: '6434fdh3cd4cfde9',
      email: 'any@any.com',
      username: 'anyUsername',
    },
  })
  user: GetUserResponseDto;

  @ApiProperty({
    example: {
      userId: '634gfd54fdec9',
      city: null,
      avatar: null,
      summary: null,
      linkedin: null,
      telegram: null,
    },
  })
  userData: GetUserDataResponseDto;
}
