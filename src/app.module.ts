import { FavoriteController } from "./favorites/favorites.controller";
import { FavoriteModule } from "./favorites/favorites.module";
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
import { FavoriteService } from "./favorites/favorite.service";

@Module({
  imports: [UserModule, TrackModule, AlbumModule, ArtistModule, FavoriteModule],
  controllers: [
    AppController,
    UserController,
    TrackController,
    AlbumController,
    ArtistController,
    FavoriteController,
  ],
  providers: [
    AppService,
    UserService,
    TrackService,
    AlbumService,
    ArtistService,
    FavoriteService,
    DatabaseService,
  ],
})
export class AppModule {}
