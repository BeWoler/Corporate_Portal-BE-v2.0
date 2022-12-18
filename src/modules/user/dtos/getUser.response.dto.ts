import { UserResponseDto } from './user.response.dto';

export class GetUserResponseDto {
  user: UserResponseDto;
}

export class GetUsersResponseDto {
  users: Array<UserResponseDto>;
}
