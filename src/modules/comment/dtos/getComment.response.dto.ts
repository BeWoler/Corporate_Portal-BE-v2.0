import { ApiProperty } from '@nestjs/swagger';
import { CommentResponseDto } from './comment.response.dto';

export class GetCommentResponseDto {
  @ApiProperty({
    example: {
      _id: '634gdvr4534cfe9',
      postId: '634gdvr4534cfe9',
      author: '634gdvr4534cfe9',
      text: 'any text',
      media: ['https://anylink/file.png', 'https://anylink/file.png'],
      date: '167797856',
      likes: ['634gdvr4534cfe9', '634gdvr4534cfe9'],
    },
  })
  comment: CommentResponseDto;
}

export class GetCommentsResponseDto {
  @ApiProperty({
    example: [
      {
        _id: '634gdvr4534cfe9',
        postId: '634gdvr4534cfe9',
        author: '634gdvr4534cfe9',
        text: 'any text',
        media: ['https://anylink/file.png', 'https://anylink/file.png'],
        date: '167797856',
        likes: ['634gdvr4534cfe9', '634gdvr4534cfe9'],
      },
      {
        _id: '634gdvr4534cfe9',
        postId: '634gdvr4534cfe9',
        author: '634gdvr4534cfe9',
        text: 'any text',
        media: 'https://anylink/file.png',
        date: '167797856',
        likes: ['634gdvr4534cfe9', '634gdvr4534cfe9'],
      },
    ],
  })
  comments: CommentResponseDto[];
}
