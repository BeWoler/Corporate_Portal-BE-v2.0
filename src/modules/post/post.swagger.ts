import {
  GetPostResponseDto,
  GetPostsResponseDto,
} from './dtos/getPost.response.dto';

export const postSwagger = {
  CREATE_POST: {
    descr: {
      summary: 'Create post',
      description: 'You must to add token to Headers (Authorization field)',
    },
    res: {
      status: 200,
      type: GetPostResponseDto,
    },
  },
  UPDATE_POST_BY_ID: {
    descr: {
      summary: 'Update post by id',
      description: 'You must to add token to Headers (Authorization field)',
    },
    res: {
      status: 200,
      type: GetPostResponseDto,
    },
  },
  DELETE_POST_BY_ID: {
    descr: {
      summary: 'Delete post by id',
      description: 'You must to add token to Headers (Authorization field)',
    },
    res: {
      status: 200,
      type: Boolean,
    },
  },
  GET_ALL_USER_POSTS_BY_ID: {
    descr: {
      summary: 'Get all user posts by id',
      description: 'You must to add token to Headers (Authorization field)',
    },
    res: {
      status: 200,
      type: GetPostsResponseDto,
    },
  },
  GET_ALL_POSTS: {
    descr: {
      summary: 'Get all posts',
      description: 'You must to add token to Headers (Authorization field)',
    },
    res: {
      status: 200,
      type: GetPostsResponseDto,
    },
  },
  LIKE_POST_BY_ID: {
    descr: {
      summary: 'Like post by id',
      description: 'You must to add token to Headers (Authorization field)',
    },
    res: {
      status: 200,
      type: GetPostResponseDto,
    },
  },
};
