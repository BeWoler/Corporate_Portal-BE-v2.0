import { ApiProperty } from '@nestjs/swagger';
import { UserDataResponseDto } from './userData.response.dto';

export class GetUserDataResponseDto {
  @ApiProperty({
    example: {
      userId: '634gfd54fdec9',
      city: 'Minsk',
      avatar: 'https://cloud/user/fgrv.png',
      summary: 'Any user bio...',
      linkedin: 'https://linkedin.com/fdfdf/dfd',
      telegram: 't.me/user',
    },
  })
  userData: UserDataResponseDto;
}
