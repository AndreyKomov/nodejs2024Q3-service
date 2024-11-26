import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseService } from 'src/db/db';

@Module({
  controllers: [UserController],
  providers: [UserService, DatabaseService],
})

export class UserModule {}
