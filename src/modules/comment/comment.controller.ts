import { HttpStatus } from '@nestjs/common';
import {
  Body,
  Delete,
  Param,
  Controller,
  Post,
  UseGuards,
  HttpCode,
  Patch,
} from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { commentSwagger } from './comment.swagger';
import { CommentRequestDto } from './dtos/comment.request.dto';
import { CommentLikeRequestDto } from './dtos/commentLike.request.dto';
import { GetCommentResponseDto } from './dtos/getComment.response.dto';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation(commentSwagger.CREATE_COMMENT_BY_POST_ID.descr)
  @ApiResponse(commentSwagger.CREATE_COMMENT_BY_POST_ID.res)
  @HttpCode(HttpStatus.CREATED)
  async createComment(
    @Body() body: CommentRequestDto,
  ): Promise<GetCommentResponseDto> {
    return this.commentService.createComment(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  @ApiOperation(commentSwagger.LIKE_COMMENT_BY_COMMENT_ID.descr)
  @ApiResponse(commentSwagger.LIKE_COMMENT_BY_COMMENT_ID.res)
  @HttpCode(HttpStatus.OK)
  async likeComment(
    @Body() body: CommentLikeRequestDto,
  ): Promise<GetCommentResponseDto> {
    return this.commentService.likeComment(body.commentId, body.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  @ApiOperation(commentSwagger.DELETE_COMMENT_BY_COMMENT_ID.descr)
  @ApiResponse(commentSwagger.DELETE_COMMENT_BY_COMMENT_ID.res)
  @HttpCode(HttpStatus.OK)
  async deleteComment(@Param('id') id: string): Promise<boolean> {
    return this.commentService.deleteComment(id);
  }
}
