import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackService } from '../track/track.service';
import { DatabaseService } from 'src/db/db';

@Module({
  providers: [AlbumService, TrackService, DatabaseService],
  controllers: [AlbumController],
})
export class AlbumModule {}
