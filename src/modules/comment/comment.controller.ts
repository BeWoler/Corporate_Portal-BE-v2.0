import { HttpStatus } from '@nestjs/common';
import {
  Body,
  Delete,
  Param,
  Controller,
  Post,
  UseGuards,
  HttpCode,
} from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
import { CommentRequestDto } from './dtos/comment.request.dto';
import { GetCommentResponseDto } from './dtos/getComment.response.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createComment(
    @Body() body: CommentRequestDto,
  ): Promise<GetCommentResponseDto> {
    return this.commentService.createComment(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async deleteComment(@Param('id') id: string): Promise<boolean> {
    return this.commentService.deleteComment(id);
  }
}
