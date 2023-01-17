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
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async createPost(body: PostRequestDto): Promise<GetPostResponseDto> {
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

  async deletePost(id: string): Promise<boolean> {
    const deletedPost = await this.postModel
      .findOneAndDelete({ _id: id })
      .lean();
    if (deletedPost) return true;
    return false;
  }

  async getAllUserPosts(id: string): Promise<GetPostsResponseDto> {
    const populateQuery = { path: 'comments' };
    const posts = await this.postModel
      .find({ author: id })
      .populate(populateQuery)
      .lean();
    return { posts };
  }

  async getAllPosts(): Promise<GetPostsResponseDto> {
    const populateQuery = [
      { path: 'author' },
      { path: 'comments', populate: { path: 'author' } },
    ];
    const posts = await this.postModel.find().populate(populateQuery).lean();
    return { posts };
  }
}
