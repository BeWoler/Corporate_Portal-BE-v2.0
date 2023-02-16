import { ApiProperty } from '@nestjs/swagger';

export class CommentLikeRequestDto {
  @ApiProperty({ example: '645gfgd334cdfe0' })
  commentId: string;

  @ApiProperty({ example: '645gfgd334cdfe0' })
  userId: string;
}
