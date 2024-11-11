import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { DatabaseService } from 'src/db/db';
import { TrackController } from './track.controller';

@Module({
  providers: [TrackService, DatabaseService],
  controllers: [TrackController],
  exports: [TrackService],
})
export class TrackModule {}
