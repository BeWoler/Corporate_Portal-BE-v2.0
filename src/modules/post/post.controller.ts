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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  GetPostResponseDto,
  GetPostsResponseDto,
} from './dtos/getPost.response.dto';
import { PostRequestDto } from './dtos/post.request.dto';
import { PostLikeRequestDto } from './dtos/postLike.request.dto';
import { PostService } from './post.service';
import { postSwagger } from './post.swagger';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation(postSwagger.CREATE_POST.descr)
  @ApiResponse(postSwagger.CREATE_POST.res)
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() body: PostRequestDto): Promise<GetPostResponseDto> {
    return this.postService.createPost(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  @ApiOperation(postSwagger.UPDATE_POST_BY_ID.descr)
  @ApiResponse(postSwagger.UPDATE_POST_BY_ID.res)
  @HttpCode(HttpStatus.OK)
  async updatePost(
    @Body() body: PostRequestDto,
    @Param('id') id: string,
  ): Promise<GetPostResponseDto> {
    return this.postService.updatePost(body, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/like')
  @ApiOperation(postSwagger.LIKE_POST_BY_ID.descr)
  @ApiResponse(postSwagger.LIKE_POST_BY_ID.res)
  @HttpCode(HttpStatus.OK)
  async likePost(
    @Body() body: PostLikeRequestDto,
  ): Promise<GetPostResponseDto> {
    return this.postService.likePost(body.postId, body.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  @ApiOperation(postSwagger.DELETE_POST_BY_ID.descr)
  @ApiResponse(postSwagger.DELETE_POST_BY_ID.res)
  @HttpCode(HttpStatus.OK)
  async deletePost(@Param('id') id: string): Promise<boolean> {
    return this.postService.deletePost(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  @ApiOperation(postSwagger.GET_ALL_USER_POSTS_BY_ID.descr)
  @ApiResponse(postSwagger.GET_ALL_USER_POSTS_BY_ID.res)
  @HttpCode(HttpStatus.OK)
  async getAllUserPosts(@Param('id') id: string): Promise<GetPostsResponseDto> {
    return this.postService.getAllUserPosts(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation(postSwagger.GET_ALL_POSTS.descr)
  @ApiResponse(postSwagger.GET_ALL_POSTS.res)
  @HttpCode(HttpStatus.OK)
  async getAllPosts(): Promise<GetPostsResponseDto> {
    return this.postService.getAllPosts();
  }
}
