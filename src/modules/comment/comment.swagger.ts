import { GetCommentResponseDto } from './dtos/getComment.response.dto';

export const commentSwagger = {
  CREATE_COMMENT_BY_POST_ID: {
    descr: {
      summary: 'Create comment by post id',
      description: 'You must to add token to Headers (Authorization field)',
    },
    res: {
      status: 200,
      type: GetCommentResponseDto,
    },
  },
  LIKE_COMMENT_BY_COMMENT_ID: {
    descr: {
      summary: 'Like comment by comment id',
      description: 'You must to add token to Headers (Authorization field)',
    },
    res: {
      status: 200,
      type: GetCommentResponseDto,
    },
  },
  DELETE_COMMENT_BY_COMMENT_ID: {
    descr: {
      summary: 'Delete comment by comment id',
      description: 'You must to add token to Headers (Authorization field)',
    },
    res: {
      status: 200,
      type: Boolean,
    },
  },
};
