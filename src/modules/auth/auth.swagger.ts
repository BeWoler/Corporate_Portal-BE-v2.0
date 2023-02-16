import { AuthResponseDto } from './dtos/auth.response.dto';

export const authSwagger = {
  SIGN_UP: {
    descr: {
      summary: 'Sign up',
      description: 'User sign up',
    },
    res: {
      status: 200,
      type: AuthResponseDto,
    },
  },
  SIGN_IN: {
    descr: {
      summary: 'Sign in',
      description: 'User sign in',
    },
    res: {
      status: 200,
      type: AuthResponseDto,
    },
  },
  LOG_OUT: {
    descr: {
      summary: 'Log out',
      description: 'User log out',
    },
    res: {
      status: 200,
      type: Boolean,
    },
  },
  REFRESH: {
    descr: {
      summary: 'Refresh',
      description: 'Refresh rt token',
    },
    res: {
      status: 200,
      type: AuthResponseDto,
    },
  },
};
