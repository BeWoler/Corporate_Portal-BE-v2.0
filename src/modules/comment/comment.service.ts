import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentRequestDto } from './dtos/comment.request.dto';
import { GetCommentResponseDto } from './dtos/getComment.response.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(body: CommentRequestDto): Promise<GetCommentResponseDto> {
    return await this.commentRepository.insertComment(body);
  }

  async likeComment(
    commentId: string,
    userId: string,
  ): Promise<GetCommentResponseDto> {
    return await this.commentRepository.likeComment(commentId, userId);
  }

  async deleteComment(id: string): Promise<boolean> {
    return await this.commentRepository.dropComment(id);
  }
}
