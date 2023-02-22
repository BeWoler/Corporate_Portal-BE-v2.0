import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { CommentModule } from './modules/comment/comment.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { UserDataModule } from './modules/userData/userData.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    UserModule,
    UserDataModule,
    AuthModule,
    PostModule,
    CommentModule,
  ],
})
export class AppModule {}
