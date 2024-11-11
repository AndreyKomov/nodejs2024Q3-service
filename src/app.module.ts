import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { DatabaseService } from './db/db';

@Module({
  imports: [UserModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, DatabaseService],
})
export class AppModule {}
