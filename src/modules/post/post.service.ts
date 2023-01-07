import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/schemas/post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async createPost() {
    return null;
  }

  async updatePost() {
    return null;
  }

  async deletePost() {
    return null;
  }

  async getAllUserPosts() {
    return null;
  }

  async getAllPosts() {
    return null;
  }
}
