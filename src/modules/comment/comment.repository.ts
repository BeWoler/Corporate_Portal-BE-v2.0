import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { Post, PostDocument } from 'src/schemas/post.schema';
import { CommentRequestDto } from './dtos/comment.request.dto';
import { GetCommentResponseDto } from './dtos/getComment.response.dto';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}

  async insertComment(body: CommentRequestDto): Promise<GetCommentResponseDto> {
    const comment = await this.commentModel.create(body);
    const post = await this.postModel.findOne({
      _id: new Types.ObjectId(comment.postId),
    });
    if (post) {
      post.comments.push(comment._id.toString());
      post.save();
    }
    return { comment };
  }

  async likeComment(
    commentId: string,
    userId: string,
  ): Promise<GetCommentResponseDto> {
    const comment = await this.commentModel.findOne({ _id: commentId });
    if (comment.likes.includes(userId)) {
      const userIndex = comment.likes.indexOf(userId, 0);
      comment.likes.splice(userIndex, 1);
      comment.save();
      return { comment };
    }

    comment.likes.push(userId);
    return { comment };
  }

  async dropComment(id: string): Promise<boolean> {
    const comment = await this.commentModel.findOneAndDelete({ _id: id });
    if (comment) return true;
    return false;
  }
}
