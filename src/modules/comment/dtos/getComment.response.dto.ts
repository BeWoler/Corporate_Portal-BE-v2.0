import { CommentResponseDto } from './comment.response.dto';

export class GetCommentResponseDto {
  comment: CommentResponseDto;
}

export class GetCommentsResponseDto {
  comments: CommentResponseDto[];
}
