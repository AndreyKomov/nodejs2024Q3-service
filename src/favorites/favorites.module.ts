import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { TrackService } from '../track/track.service';
import { FavoriteController } from './favorites.controller';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { DatabaseService } from 'src/db/db';

@Module({
  providers: [
    FavoriteService,
    TrackService,
    AlbumService,
    ArtistService,
    DatabaseService,
  ],
  controllers: [FavoriteController],
})
export class FavoriteModule {}
