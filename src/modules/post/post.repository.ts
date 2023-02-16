import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/schemas/post.schema';
import {
  GetPostResponseDto,
  GetPostsResponseDto,
} from './dtos/getPost.response.dto';
import { PostRequestDto } from './dtos/post.request.dto';

@Injectable()
export class PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async insertPost(body: PostRequestDto): Promise<GetPostResponseDto> {
    const post = await this.postModel.create(body);
    return { post };
  }

  async updatePost(
    body: PostRequestDto,
    id: string,
  ): Promise<GetPostResponseDto> {
    const post = await this.postModel
      .findOneAndUpdate({ _id: id }, { $set: body }, { new: true })
      .lean();
    return { post };
  }

  async dropPost(id: string): Promise<boolean> {
    const deletedPost = await this.postModel
      .findOneAndDelete({ _id: id })
      .lean();
    if (deletedPost) return true;
    return false;
  }

  async selectAllUserPosts(id: string): Promise<GetPostsResponseDto> {
    const populateQuery = { path: 'comments' };
    const posts = await this.postModel
      .find({ author: id })
      .populate(populateQuery)
      .lean();
    return { posts };
  }

  async selectAllPosts(): Promise<GetPostsResponseDto> {
    const populateQuery = [
      { path: 'author' },
      { path: 'comments', populate: { path: 'author' } },
    ];
    const posts = await this.postModel.find().populate(populateQuery).lean();
    return { posts };
  }

  async likePost(postId: string, userId: string): Promise<GetPostResponseDto> {
    const post = await this.postModel.findOne({ _id: postId });
    if (post.likes.includes(userId)) {
      const userIndex = post.likes.indexOf(userId, 0);
      post.likes.splice(userIndex, 1);
      post.save();
      return { post };
    }

    post.likes.push(userId);
    post.save();
    return { post };
  }
}
