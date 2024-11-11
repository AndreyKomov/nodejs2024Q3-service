import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { DatabaseService } from 'src/db/db';

@Module({
  providers: [ArtistService, TrackService, AlbumService, DatabaseService],
  controllers: [ArtistController],
})
export class ArtistModule {}
