import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/db/db';
import { Track } from 'src/interfaces/track';
import { CreateTrackDto } from './dto/create-track.dto';
import { ResponseTrackDto } from './dto/response-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private db: DatabaseService<Track>) {}

  create(createTrackDto: CreateTrackDto): ResponseTrackDto {
    const track: Track = {
      ...createTrackDto,
    };
    return this.db.create(track);
  }

  findAll(): ResponseTrackDto[] {
    return this.db.findAll();
  }

  findOne(id: string): ResponseTrackDto {
    const track = this.db.findOne(id);

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): ResponseTrackDto {
    const track = this.db.findOne(id);

    if (!track) {
      throw new NotFoundException(`Track with ID: "${id}" is not found.`);
    }

    const updatedTrack: Track = this.db.update(id, {
      ...track,
      name: updateTrackDto.name,
      artistId: updateTrackDto.artistId,
      albumId: updateTrackDto.albumId,
      duration: updateTrackDto.duration,
    });

    return updatedTrack;
  }

  remove(id: string): boolean {
    const isTrackDeleted = this.db.remove(id);
    if (!isTrackDeleted) {
      throw new NotFoundException(`Track with ID: "${id}" is not found.`);
    }

    return isTrackDeleted;
  }
}
