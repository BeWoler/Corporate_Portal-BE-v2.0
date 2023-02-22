import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserData, UserDataSchema } from 'src/schemas/userData.schema';
import { UserDataController } from './userData.controller';
import { UserDataRepository } from './userData.repository';
import { UserDataService } from './userData.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserData.name, schema: UserDataSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserDataController],
  providers: [UserDataService, UserDataRepository],
  exports: [UserDataService],
})
export class UserDataModule {}
