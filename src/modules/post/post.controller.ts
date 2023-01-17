import { HttpStatus } from '@nestjs/common';
import {
  Body,
  Delete,
  Param,
  Controller,
  Post,
  Patch,
  Get,
  UseGuards,
  HttpCode,
} from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import {
  GetPostResponseDto,
  GetPostsResponseDto,
} from './dtos/getPost.response.dto';
import { PostRequestDto } from './dtos/post.request.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createPost(@Body() body: PostRequestDto): Promise<GetPostResponseDto> {
    return this.postService.createPost(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  async updatePost(
    @Body() body: PostRequestDto,
    @Param('id') id: string,
  ): Promise<GetPostResponseDto> {
    return this.postService.updatePost(body, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async deletePost(@Param('id') id: string): Promise<boolean> {
    return this.postService.deletePost(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getAllUserPosts(@Param('id') id: string): Promise<GetPostsResponseDto> {
    return this.postService.getAllUserPosts(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllPosts(): Promise<GetPostsResponseDto> {
    return this.postService.getAllPosts();
  }
}
