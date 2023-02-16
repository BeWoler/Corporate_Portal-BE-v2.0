import {
  GetUserResponseDto,
  GetUsersResponseDto,
} from './dtos/getUser.response.dto';

export const userSwagger = {
  GET_USER_BY_ID: {
    descr: {
      summary: 'Get one user by id',
      description: 'You must to add token to Headers (Authorization field)',
    },
    res: {
      status: 200,
      type: GetUserResponseDto,
    },
  },
  GET_ALL_USERS: {
    descr: {
      summary: 'Get all users',
      description: 'You must to add token to Headers (Authorization field)',
    },
    res: {
      status: 200,
      type: GetUsersResponseDto,
    },
  },
};
