import { AlbumService } from './album/album.service';
import { TrackService } from './track/track.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { DatabaseService } from './db/db';
import { TrackModule } from './track/track.module';
import { TrackController } from './track/track.controller';
import { AlbumModule } from './album/album.module';
import { AlbumController } from './album/album.controller';
import { ArtistModule } from './artist/artist.module';
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';

@Module({
  imports: [UserModule, TrackModule, AlbumModule, ArtistModule],
  controllers: [
    AppController,
    UserController,
    TrackController,
    AlbumController,
    ArtistController,
  ],
  providers: [
    AppService,
    UserService,
    TrackService,
    AlbumService,
    ArtistService,
    DatabaseService,
  ],
})
export class AppModule {}
