import { Controller, Post } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost() {
    return this.postService.createPost();
  }

  @Post()
  async updatePost() {
    return this.postService.updatePost();
  }

  @Post()
  async deletePost() {
    return this.postService.deletePost();
  }

  @Get()
  async getAllUserPosts() {
    return this.postService.getAllUserPosts();
  }

  @Get()
  async getAllPosts() {
    return this.postService.getAllPosts();
  }
}
