import { GetUserDataResponseDto } from './dtos/getUserData.response.dto';

export const userDataSwagger = {
  CREATE_USER_DATA: {
    descr: {
      summary: 'Add user data',
      description: 'You must to add token to Headers (Authorization field)',
    },
    res: {
      status: 200,
      type: GetUserDataResponseDto,
    },
  },
  GET_USER_DATA_BY_ID: {
    descr: {
      summary: 'Get one user data by id',
      description: 'You must to add token to Headers (Authorization field)',
    },
    res: {
      status: 200,
      type: GetUserDataResponseDto,
    },
  },
  UPDATE_USER_DATA_BY_ID: {
    descr: {
      summary: 'Update one user data by id',
      description: 'You must to add token to Headers (Authorization field)',
    },
    res: {
      status: 200,
      type: GetUserDataResponseDto,
    },
  },
};
