import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackService } from '../track/track.service';

@Module({
  providers: [AlbumService, TrackService],
  controllers: [AlbumController],
})
export class AlbumModule {}
