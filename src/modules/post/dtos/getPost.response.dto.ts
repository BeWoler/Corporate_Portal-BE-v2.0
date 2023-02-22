import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { PostResponseDto } from './post.response.dto';

export class GetPostResponseDto {
  @ApiProperty({
    example: {
      _id: '634gdvr4534cfe9',
      author: '634gdvr4534cfe9',
      text: 'any text',
      media: ['https://anylink/file.png', 'https://anylink/file.png'],
      date: '16977707',
      comments: ['634gdvr4534cfe9', '634gdvr4534cfe9'],
      likes: ['634gdvr4534cfe9', '634gdvr4534cfe9'],
    },
  })
  post: PostResponseDto;
}

export class GetPostsResponseDto {
  @ApiProperty({
    example: [
      {
        _id: '634gdvr4534cfe9',
        author: '634gdvr4534cfe9',
        text: 'any text',
        media: ['https://anylink/file.png', 'https://anylink/file.png'],
        date: '16977707',
        comments: ['634gdvr4534cfe9', '634gdvr4534cfe9'],
        likes: ['634gdvr4534cfe9', '634gdvr4534cfe9'],
      },
      {
        _id: '634gdvr4534cfe9',
        author: '634gdvr4534cfe9',
        text: 'any text',
        media: 'https://anylink/file.png',
        date: '16977707',
        comments: ['634gdvr4534cfe9', '634gdvr4534cfe9'],
        likes: ['634gdvr4534cfe9', '634gdvr4534cfe9'],
      },
    ],
  })
  posts: PostResponseDto[];
}
