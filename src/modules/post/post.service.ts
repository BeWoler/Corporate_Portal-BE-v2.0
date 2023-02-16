import { Injectable } from '@nestjs/common';
import {
  GetPostResponseDto,
  GetPostsResponseDto,
} from './dtos/getPost.response.dto';
import { PostRequestDto } from './dtos/post.request.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async createPost(body: PostRequestDto): Promise<GetPostResponseDto> {
    return await this.postRepository.insertPost(body);
  }

  async updatePost(
    body: PostRequestDto,
    id: string,
  ): Promise<GetPostResponseDto> {
    return await this.postRepository.updatePost(body, id);
  }

  async deletePost(id: string): Promise<boolean> {
    return await this.postRepository.dropPost(id);
  }

  async getAllUserPosts(id: string): Promise<GetPostsResponseDto> {
    return await this.postRepository.selectAllUserPosts(id);
  }

  async getAllPosts(): Promise<GetPostsResponseDto> {
    return await this.postRepository.selectAllPosts();
  }

  async likePost(postId: string, userId: string): Promise<GetPostResponseDto> {
    return await this.postRepository.likePost(postId, userId);
  }
}
